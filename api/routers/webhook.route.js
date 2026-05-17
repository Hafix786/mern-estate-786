import express from 'express';
import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

const router = express.Router();

// 1. Your Supabase Signup Webhook endpoint (/api/webhooks/supabase-signup)
router.post('/supabase-signup', async (req, res, next) => {
  try {
    const webhookSecret = req.headers['x-supabase-webhook-secret'];
    if (webhookSecret !== process.env.SUPABASE_WEBHOOK_SECRET) {
      return res.status(401).json({ success: false, message: 'Unauthorized webhook source' });
    }

    const { record } = req.body; 
    if (!record) return res.status(400).json({ success: false, message: 'No payload found' });

    const { email, raw_user_meta_data } = record;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(200).json({ success: true, message: 'Synced' });

    const baseName = raw_user_meta_data?.full_name || 'user';
    const generatedUsername = baseName.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4);
    const hashedPassword = bcryptjs.hashSync(Math.random().toString(36).slice(-8), 10);

    const newUser = new User({
      username: generatedUsername,
      email: email,
      password: hashedPassword,
      avatar: raw_user_meta_data?.avatar_url || '',
    });

    await newUser.save();
    return res.status(201).json({ success: true });
  } catch (error) {
    next(error);
  }
});

// 2. Your Frontend Fetch profile endpoint (/api/webhooks/profile/:email)
router.get('/profile/:email', async (req, res, next) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found in MongoDB' });
    }

    const { password, ...rest } = user._doc;
    return res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
});

// MAKE SURE THIS LINE EXISTS AT THE VERY BOTTOM:
export default router;