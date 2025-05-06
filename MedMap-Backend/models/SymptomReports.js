const mongoose = require("mongoose");

const symptomReportSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        symptoms: [
            {
                type: String,
                required: true
            }
        ],
        submittedAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("SymptomReport", symptomReportSchema);
