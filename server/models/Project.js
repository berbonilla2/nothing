import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    role: { type: String },
    stack: [{ type: String }],
    url: { type: String },
    repo: { type: String }
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model('Project', projectSchema);


