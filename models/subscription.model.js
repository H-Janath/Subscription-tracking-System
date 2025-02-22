import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Subscription name is required"],
            trim: true,
            minlength: 2,
            maxlength: 100,
        },
        currency: {
            type: String,
            enum: ["USD", "EUR", "GBP"],
            default: "USD",
        },
        frequency: {
            type: String,
            enum: ["daily", "weekly", "monthly", "yearly"],
            required: true,
        },
        category: {
            type: String,
            enum: [
                "sports",
                "news",
                "entertainment",
                "lifestyle",
                "technology",
                "finance",
                "politics",
                "other",
            ],
            required: true,
        },
        paymentMethod: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: String,
            enum: ["active", "cancelled", "expired"],
            default: "active",
        },
        startDate: {
            type: Date,
            required: true,
            validate: {
                validator: (value) => value <= new Date(),
                message: "Start date must be in the past or today",
            },
        },
        renewalDate: {
            type: Date,
            validate: {
                validator: function (value) {
                    return !value || value > this.startDate;
                },
                message: "Renewal date must be after the start date",
            },
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
    },
    { timestamps: true }
);

subscriptionSchema.pre("save", function (next) {
    const renewalPeriods = {
        daily: 1,
        weekly: 7,
        monthly: 30,
        yearly: 365,
    };

    if (!this.renewalDate) {
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }

    if (this.renewalDate <= new Date()) {
        this.status = "expired";
    }

    next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
