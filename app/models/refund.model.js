const db = require("../models/db")

const Refund = function (refund) {
    this.studid=refund.studid
    this.reason = refund.reason
    this.approvedAmnt = refund.approvedAmnt
}