const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add a course title"],
  },
  description: {
    type: String,
    required: [true, "Please add a Description"],
  },
  weeks: {
    type: Number,
    required: [true, "Please add a weeks"],
  },
  tuition: {
    type: Number,
    required: [true, "Please add a tuition cost"],
  },
  minimumSkill: {
    type: String,
    required: [true, "Please add a minimum Skill"],
    enum: ["beginner", "intermediate", "advanced"],
  },
  scholarhipsAvailable: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: "Bootcamp",
    required: true,
  },
});

// Calculate AVerage Cost

CourseSchema.statics.getAverageCost = async function (bootcampId) {
  console.log("Calculating AVerage cost");

  const obj = await this.aggregate([
    {
      $match: { bootcamp: bootcampId },
    },
    {
      $group: {
        _id: '$bootcamp',
        averageCost: { $avg: "$tuition" },
      },
    },
  ]);

  console.log(obj, "Calculations");
  const averageCost = obj[0]
    ? Math.ceil(obj[0].averageCost / 10) * 10
    : undefined;
  try {
    await this.model("Bootcamp").findByIdAndUpdate(bootcampId, {
      averageCost,
    });
  } catch (err) {
    console.log(err);
  }
};
// Call Average cost after save
CourseSchema.post("save", { document: true, query: false }, async function (doc) {
  //const self = this;
 // console.log(this, this.bootcamp, "From Save");
  await this.constructor.getAverageCost(this.bootcamp);
  //self.constuctor.getAverageCost(this.bootcamp)
  //next();
});

// Cascading delete functionality
CourseSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    console.log(`Bootcamp ID ${this._id}`);
   //  console.log(this, this.bootcamp, "From Save");
    // this.constuctor.getAverageCost(this.bootcamp)
    await this.constructor.getAverageCost(this.bootcamp);

    //this.model("Course").deleteMany({ bootcamp: this._id });
    // next();
  }
);

module.exports = mongoose.model("Course", CourseSchema);
