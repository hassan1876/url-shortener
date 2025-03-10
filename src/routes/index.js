import express from 'express';
import Url from '../models/Url.js';
import redisClient from '../utils/redisClient.js';
const router = express.Router();

router.get('/:urlid', async (req, res) => {
  try {
    const cachedURL =await redisClient.get( req.params.urlid);
    if(cachedURL) {
      console.log('Cache Hit');
      const parsedURL = JSON.parse(cachedURL);
      await Url.updateOne(
        {
          urlId: req.params.urlid,
        },
        { $inc: { clicks: 1 } })
        
         return res.redirect(parsedURL.origUrl);

    }
    const url = await Url.findOne({ urlId: req.params.urlid });
    if (url) {
      console.log('Cache Miss');
      await redisClient.setEx(req.params.urlid, 3600, JSON.stringify(url));
      await Url.updateOne(
        {
          urlId: req.params.urlid,
        },
        { $inc: { clicks: 1 } }
      );
      return res.redirect(url.origUrl);
    } else res.status(404).json('Not found');
  } catch (err) {
    console.log(err);
    res.status(500).json('Server Error');
  }
});

export default router;