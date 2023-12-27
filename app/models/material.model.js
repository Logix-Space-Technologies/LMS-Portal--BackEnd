const db = require('../models/db')
const {response} = require('express')




const Material = function(material){
    this.id = material.id
    this.batchId = material.batchId
    this.fileName = material.fileName
    this.materialDesc = material.materialDesc
    this.uploadFile = material.uploadFile
    this.remarks = material.remarks
    
};


Material.materialCreate = (newMaterial , result) => {
    db.query("SELECT * FROM materials WHERE id = ? AND AND deleteStatus = 0 AND isActive = 1",[newMaterial.batchId], (err, batchRes) => {
        if (err) {
            console.error("Error checking existing batch: ", err);
            result(err, null);
            return
        }else if (batchRes.length === 0){
            console.log("No such batch exists.");
            result("No such batch exists.", null);
            return;
        }else {
            // Check if the meterial already exists
            db.query("SELECT * FROM materials WHERE fileName=? AND batchId=? AND deleteStatus = 0 AND isActive = 1",[newMaterial.fileName, newMaterial.batchId], (err, res)=>{
                if (err){
                    console.error("Error checking existing material: ", err);
                    result(err, null);
                    return; 
                }else if (res.length > 0) {
                    console.log("Task already exists.");
                    result("Task Title already exists.", null);
                    return; 
                } else {
                    //Insert new material
                    db.query("INSERT INTO materials SET ?", newMaterial, (err, res)=>{
                        if (err) {
                            console.error("Error inserting task: ", err);
                            result(err, null);
                            return;
                        } else {
                            console.log("Task inserted: ", {id: res.id, ...newMaterial});
                            result(null, {id: res.id, ...newMaterial});
                            
                        }
                    })
                    
                }
            })
        }
    })
}