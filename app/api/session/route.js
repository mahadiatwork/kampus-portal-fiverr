// pages/api/session.js (API Route)
import { withSessionRoute } from '../../lib/session';

async function handler(req, res) {
  if (req.session.user) {
    res.status(200).json({ user: req.session.user });
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
}

export default withSessionRoute(handler);
