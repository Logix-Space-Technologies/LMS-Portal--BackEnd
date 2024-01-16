const db = require('../models/db')
const { response } = require('express')




const Material = function (material) {
    this.id = material.id
    this.batchId = material.batchId
    this.fileName = material.fileName
    this.materialDesc = material.materialDesc
    this.uploadFile = material.uploadFile
    this.remarks = material.remarks

};


Material.materialCreate = (newMaterial, result) => {
    db.query("SELECT * FROM batches WHERE id = ? AND deleteStatus = 0 AND isActive = 1", [newMaterial.batchId], (err, batchRes) => {
        if (err) {
            console.error("Error checking existing batch: ", err);
            result(err, null);
            return
        }
        if (batchRes.length === 0) {
            console.log("No such batch exists.");
            result("No such batch exists.", null);
            return;
        } else {
            // Check if the material already exists
            db.query("SELECT * FROM materials WHERE fileName=? AND batchId=? AND deleteStatus = 0 AND isActive = 1", [newMaterial.fileName, newMaterial.batchId], (err, res) => {
                if (err) {
                    console.error("Error checking existing material: ", err);
                    result(err, null);
                    return;
                } 
                if (res.length > 0) {
                    console.log("Material already exists.");
                    result("Material Title already exists.", null);
                    return;
                } else {
                    //Insert new material
                    db.query("INSERT INTO materials SET ?", newMaterial, (err, res) => {
                        if (err) {
                            console.error("Error inserting task: ", err);
                            result(err, null);
                            return;
                        } else {
                            console.log("Material inserted: ", { id: res.insertId, ...newMaterial });
                            result(null, { id: res.insertId, ...newMaterial });
                            return;

                        }
                    })

                }
            })
        }
    })
}

Material.searchMaterial = (searchString, result) => {
    db.query("SELECT m.fileName,m.materialDesc,m.uploadFile,m.remarks,b.batchName FROM materials m JOIN batches b ON m.batchId = b.id WHERE m.deleteStatus=0 AND m.isActive=1 AND b.deleteStatus=0 AND b.isActive=1 AND (fileName LIKE ? OR materialDesc LIKE ?)",
        [`%${searchString}%`, `%${searchString}%`],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            } else {
                console.log("Materials: ", res);
                result(null, res);
            }
        });
}

Material.updateMaterial = (materialUpdate, result) => {
    // Check if the material exists
    db.query("SELECT * FROM materials WHERE id = ? AND deleteStatus = 0 AND isActive = 1", [materialUpdate.id], (err, materialRes) => {
        if (err) {
            console.error("Error checking existing material: ", err);
            result(err, null);
            return;
        }
        if (materialRes.length === 0) {
            console.log("Material not found.");
            result("Material not found.", null);
            return;
        } else {
            // Check if the updated material details already exist
            db.query("SELECT * FROM materials WHERE fileName = ? AND batchId = ? AND id != ? AND deleteStatus = 0 AND isActive = 1",
                [materialUpdate.fileName, materialUpdate.batchId, materialUpdate.id],
                (err, duplicateCheck) => {
                    if (err) {
                        console.error("Error checking duplicate material: ", err);
                        result(err, null);
                        return;
                    }
                    if (duplicateCheck.length > 0) {
                        console.log("Updated material details already exist.");
                        result("Updated material details already exist.", null);
                        return;
                    } else {
                        // Update material details
                        db.query("UPDATE materials SET fileName = ?, materialDesc = ?, uploadFile = ?, remarks = ?, batchId = ?, updatedDate = CURRENT_DATE(), updatedStatus = 1 WHERE id = ? AND deleteStatus = 0 AND isActive = 1",
                            [materialUpdate.fileName, materialUpdate.materialDesc, materialUpdate.uploadFile, materialUpdate.remarks, materialUpdate.batchId, materialUpdate.id],
                            (err, res) => {
                                if (err) {
                                    console.error("Error updating material: ", err);
                                    result(err, null);
                                    return;
                                }
                                console.log("Updated Material Details: ", { id: materialUpdate.id, ...materialUpdate });
                                result(null, { id: materialUpdate.id, ...materialUpdate });
                            });
                    }
                });
        }
    });
};


module.exports = Material