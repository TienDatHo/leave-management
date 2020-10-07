const express = require('express');
const router = express.Router();
const pool = require('./database');


router.post('/request', (req, res) => {
    console.log(req.body);
    if(req.body) {
        pool.getConnection()
            .then(conn => {
                const values = [req.body.StaffID, req.body.StartDate, req.body.EndDate, req.body.Morning, req.body.Period1, req.body.Period2, req.body.Period3, req.body.Period4, req.body.Period5, req.body.LeaveType, req.body.Status];
                conn.query('INSERT INTO requests (StaffID, StartDate, EndDate, MG, Period1, Period2, Period3, Period4, Period5, LeaveType, Status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', values)
                    .then((result) => {
                        console.log(result);
                        conn.end();
                        res.json({data: result, success: true});
                    })
                    .catch(err => {
                        console.log(err);
                        conn.end();
                        res.json({error: err, success: false});
                    })
            }).catch(err => {
            console.log(err);
            res.json({error: err, success: false});
        });
    } else {
        res.json({error: 'no body', success: false});
    }
});

router.get('/view', (req, res) => {
    pool.getConnection()
        .then(conn => {
            conn.query("SELECT StaffID, DATE_FORMAT(StartDate, '%Y/%m/%d') AS StartDate, DATE_FORMAT(EndDate, '%Y/%m/%d') AS EndDate, Reason, Period FROM requests")
                .then((result) => {
                    console.log(result);
                    conn.end();
                    res.json({data: result, success: true});
                })
                .catch(err => {
                    console.log(err);
                    conn.end();
                    res.json({error: err, success: false});
                })

        }).catch(err => {
        console.log(err);
        res.json({error: err, success: false});
    });
});

router.put('/update/:id', (req, res) => {
    pool.getConnection()
        .then(conn => {
            conn.query("EMPTY")
                .then((result) => {
                    console.log(result);
                    conn.end();
                    res.json({data: result, success: true});
                })
                .catch(err => {
                    console.log(err);
                    conn.end();
                    res.json({error: err, success: false});
                })

        }).catch(err => {
        console.log(err);
        res.json({error: err, success: false});
    });
});

router.delete('/delete/:id', (req, res) => {
    pool.getConnection()
        .then(conn => {
            conn.query("EMPTY")
                .then((result) => {
                    console.log(result);
                    conn.end();
                    res.json({data: result, success: true});
                })
                .catch(err => {
                    console.log(err);
                    conn.end();
                    res.json({error: err, success: false});
                })

        }).catch(err => {
        console.log(err);
        res.json({error: err, success: false});
    });
});


module.exports = router;