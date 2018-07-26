import * as express from 'express';
import * as root from 'app-root-path';
import { Conf } from '../../config/common';

const router = express.Router();

router.get('/types', (req: express.Request, res: express.Response, next: express.NextFunction) => {
 res.download(
    `${root}/server/interfaces/types.ts`,
    `${Conf.BFFName}-types.ts`
  );
});

export = router;
