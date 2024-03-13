const db = require('../models/db')


const Curriculum = function (curriculum) {
    this.id = curriculum.id;
    this.batchId = curriculum.batchId;
    this.curriculumTitle = curriculum.curriculumTitle;
    this.curriculumDesc = curriculum.curriculumDesc;
    this.updatedBy = curriculum.updatedBy
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




Curriculum.searchCurriculum = (search , result)=>{
    const searchTerm = '%'+ search + '%'
    db.query("SELECT b.batchName, c.id, c.curriculumTitle, c.curriculumDesc, CASE WHEN c.addedBy = 0 THEN 'admin' ELSE asa.AdStaffName END AS addedBy, c.curriculumFileLink FROM curriculum c JOIN batches b ON c.batchId = b.id JOIN college co ON b.collegeId = co.id LEFT JOIN  admin_staff asa ON c.addedBy = asa.id WHERE c.isActive = 1 AND c.deleteStatus = 0 AND b.isActive = 1 AND b.deleteStatus = 0 AND co.isActive = 1 AND co.deleteStatus = 0 AND ( c.curriculumTitle LIKE ? OR c.curriculumDesc LIKE ? OR b.batchName LIKE ? OR co.collegeName LIKE ?)",
    [searchTerm, searchTerm, searchTerm,searchTerm],
    (err, res) => {
        if (err) {
            console.log("Error : ", err)
            result(err, null)
            result
        } else {
            console.log("Curriculum   Details : ", res)
            result(null, res)
        }
    })
}


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

            db.query("SELECT b.batchName, c.id, c.curriculumTitle, c.curriculumDesc, c.addedDate, c.curriculumFileLink, COALESCE(asf.AdStaffName, CASE WHEN c.addedBy = 0 THEN 'Admin' ELSE c.addedBy END) AS addedBy, COALESCE(usf.AdStaffName, CASE WHEN c.updatedBy = 0 THEN 'Admin' ELSE c.updatedBy END) AS updatedBy FROM curriculum c JOIN batches b ON c.batchId = b.id LEFT JOIN admin_staff asf ON c.addedBy = asf.id AND c.addedBy != 0 AND asf.AdStaffName IS NOT NULL LEFT JOIN admin_staff usf ON c.updatedBy = usf.id AND c.updatedBy != 0 AND usf.AdStaffName IS NOT NULL WHERE c.deleteStatus = 0 AND c.isActive = 1 AND c.batchId = ?",[batchId],
                (curriculumErr, curriculumRes) => {
                    if (curriculumErr) {
                        console.log("error: ", curriculumErr);
                        result(curriculumErr, null)
                        return
                    } else {
                        const formattedCurriculums = curriculumRes.map(curriculum => ({ ...curriculum, addedDate: curriculum.addedDate.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: 'numeric' }), updatedDate: curriculum.updatedDate ? curriculum.updatedDate.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: 'numeric' }) : null})); // Formats the date as 'YYYY-MM-DD'
                        console.log("success:", formattedCurriculums)
                        result(null, formattedCurriculums);
                    }
                })
        })
}


Curriculum.curriculumDelete = (id, result) => {
    db.query("UPDATE curriculum SET isActive=0, deleteStatus=1 WHERE id=? AND isActive=1 AND deleteStatus=0", [id], (err, res) => {
        if (err) {
            console.log("error:", err);
            result(err, null);
            return;
        }
        if (res.affectedRows === 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("delete Curriculum with id:", { id: id });
        result(null, { id: id });
    });
};


Curriculum.updateCurriculum = (updCurriculum, result) => {
    db.query("SELECT * FROM curriculum WHERE id = ? AND deleteStatus = 0 AND isActive = 1", [updCurriculum.id], (err, curRes) => {
        if (err) {
            console.error("Error checking existing curriculum: ", err);
            result(err, null);
            return;
        }

        if (curRes.length === 0) {
            console.log("No such curriculum exists.");
            result("No such curriculum exists.", null);
            return;
        }
        db.query("SELECT * FROM curriculum WHERE curriculumTitle=? AND batchId=? AND deleteStatus = 0 AND isActive = 1", [updCurriculum.curriculumTitle, updCurriculum.id], (err, res) => {
            if (err) {
                console.error("Error checking existing curriculum: ", err);
                result(err, null);
                return;
            }

            if (res.length > 0) {
                console.log("Curriculum Title already exists.");
                result("Curriculum Title already exists.", null);
                return;
            }

            let updateQuery;
            let updateValues;

            if (updCurriculum.curriculumFileLink) {
                updateQuery = "UPDATE `curriculum` SET `curriculumTitle`= ?, `curriculumDesc`= ?, `updatedDate`= CURRENT_DATE, `updatedBy`= ?, `curriculumFileLink`= ?, `updateStatus`= 1 WHERE id = ?";
                updateValues = [
                    updCurriculum.curriculumTitle,
                    updCurriculum.curriculumDesc,
                    updCurriculum.updatedBy,
                    updCurriculum.curriculumFileLink,
                    updCurriculum.id
                ];
            } else {
                updateQuery = "UPDATE `curriculum` SET `curriculumTitle`= ?, `curriculumDesc`= ?, `updatedDate`= CURRENT_DATE, `updatedBy`= ?, `updateStatus`= 1 WHERE id = ?";
                updateValues = [
                    updCurriculum.curriculumTitle,
                    updCurriculum.curriculumDesc,
                    updCurriculum.updatedBy,
                    updCurriculum.id
                ];
            }

            db.query(updateQuery, updateValues, (err, res) => {
                if (err) {
                    console.error("Error updating curriculum: ", err);
                    result(err, null);
                    return;
                }

                console.log("Updated Curriculum Details : ", { id: updCurriculum.id, ...updCurriculum });
                result(null, { id: updCurriculum.id, ...updCurriculum });
            });
        });
    });
};



Curriculum.viewOneCurriculum  = (id, result) => {
    db.query("SELECT id,curriculumTitle,batchId,curriculumDesc,curriculumFileLink FROM curriculum WHERE deleteStatus = 0 AND isActive = 1 AND id = ?", id,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("curriculum: ", res);
            result(null, res);
        })
}



module.exports = Curriculum;
