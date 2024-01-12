const db = require('../models/db')


const Curriculum = function (curriculum) {
    this.id = curriculum.id;
    this.batchId = curriculum.batchId;
    this.curriculumTitle = curriculum.curriculumTitle;
    this.curriculumDesc = curriculum.curriculumDesc;
    this.addedBy = curriculum.addedBy;
    this.curriculumFileLink = curriculum.curriculumFileLink;
};

Curriculum.curriculumCreate = (newCurriculum, result) => {
    db.query("SELECT * FROM batches WHERE id = ? AND deleteStatus = 0 AND isActive = 1", [newCurriculum.batchId], (err, batchRes) => {
        if (err) {
            console.error("Error checking existing batch: ", err);
            result(err, null);
            return;
        }
        if (batchRes.length === 0) {
            console.log("No such batch exists.");
            result("No such batch exists.", null);
            return;
        } else {
            // Check if the curriculum already exists
            db.query("SELECT * FROM curriculum WHERE curriculumTitle=? AND batchId=? AND deleteStatus = 0 AND isActive = 1", [newCurriculum.curriculumTitle, newCurriculum.batchId], (err, res) => {
                if (err) {
                    console.error("Error checking existing curriculum: ", err);
                    result(err, null);
                    return;
                }
                if (res.length > 0) {
                    console.log("Curriculum Title already exists.");
                    result("Curriculum Title already exists.", null);
                    return;
                } else {
                    // Insert new curriculum
                    db.query("INSERT INTO curriculum SET ?", newCurriculum, (err, res) => {
                        if (err) {
                            console.error("Error inserting curriculum: ", err);
                            result(err, null);
                            return;
                        } else {
                            console.log("Curriculum inserted: ", { id: res.insertId, ...newCurriculum });
                            result(null, { id: res.insertId, ...newCurriculum });
                            return;
                        }
                    });
                }
            });
        }
    });
};

Curriculum.curriculumView = (batchId, result) => {
    db.query("SELECT * FROM batches WHERE id = ? AND deleteStatus=0 AND isActive=1",
        [batchId],
        (batchErr, batchRes) => {
            if (batchErr) {
                console.log("error checking batch: ", batchErr);
                return result(batchErr, null);
            }

            if (batchRes.length === 0) {
                return result("Batch not found", null);
            }

            db.query("SELECT b.batchName, c.* FROM curriculum c JOIN batches b ON c.batchId = b.id WHERE c.deleteStatus = 0 AND c.isActive = 1",
                (curriculumErr, curriculumRes) => {
                    if (curriculumErr) {
                        console.log("error: ", curriculumErr);
                        result(curriculumErr, null)
                        return
                    } else {
                        console.log("success:", curriculumRes)
                        result(null, curriculumRes);
                    }
                })
        })
}


module.exports = Curriculum;
