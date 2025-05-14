

// import Referral from '../models/Referral.js';
// // GET all
// exports.getReferrals = async (req, res) => {
//   const referrals = await Referral.find();
//   res.json(referrals);
// };

// // POST
// exports.createReferral = async (req, res) => {
//   const { referralName, referralCode, date, status } = req.body;
//   const imageUrl = req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl;

//   const newReferral = new Referral({ referralName, referralCode, date, status, imageUrl });
//   await newReferral.save();
//   res.status(201).json(newReferral);
// };

// // PUT
// exports.updateReferral = async (req, res) => {
//   const { id } = req.params;
//   const { referralName, referralCode, date, status } = req.body;
//   const imageUrl = req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl;

//   const updated = await Referral.findByIdAndUpdate(
//     id,
//     { referralName, referralCode, date, status, imageUrl },
//     { new: true }
//   );
//   res.json(updated);
// };

// // DELETE
// exports.deleteReferral = async (req, res) => {
//   await Referral.findByIdAndDelete(req.params.id);
//   res.json({ message: 'Referral deleted' });
// };


import Referral from '../models/Referral.js';

// GET all referrals
export const getReferrals = async (req, res) => {
  const referrals = await Referral.find();
  res.json(referrals);
};

// CREATE a new referral
export const createReferral = async (req, res) => {
  const { referralName, referralCode, date, status } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl;

  const newReferral = new Referral({ referralName, referralCode, date, status, imageUrl });
  await newReferral.save();
  res.status(201).json(newReferral);
};

// UPDATE a referral
export const updateReferral = async (req, res) => {
  const { id } = req.params;
  const { referralName, referralCode, date, status } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl;

  const updated = await Referral.findByIdAndUpdate(
    id,
    { referralName, referralCode, date, status, imageUrl },
    { new: true }
  );
  res.json(updated);
};

// DELETE a referral
export const deleteReferral = async (req, res) => {
  await Referral.findByIdAndDelete(req.params.id);
  res.json({ message: 'Referral deleted' });
};
