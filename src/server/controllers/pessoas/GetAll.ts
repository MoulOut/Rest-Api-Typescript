import { Request, Response } from 'express';
import { validation } from '../../shared/middleware';
import yup from 'yup';
import { PessoasProvider } from '../../database/providers/pessoas';
import { StatusCodes } from 'http-status-codes';

interface QueryProps {
  page?: number;
  limit?: number;
  filter?: string;
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<QueryProps>(
    yup.object().shape({
      page: yup.number().integer().optional().moreThan(0).default(1),
      limit: yup.number().integer().optional().moreThan(0).default(7),
      filter: yup.string().optional().default(''),
    })
  ),
}));

export const getAll = async (
  req: Request<{}, {}, {}, QueryProps>,
  res: Response
) => {
  const result = PessoasProvider.getAll(
    req.query.page || 1,
    req.query.limit || 7,
    req.query.filter || ''
  );

  const count = await PessoasProvider.count(req.query.filter);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  } else if (count instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: count.message,
      },
    });
  }

  res.setHeader('access-control-expose-headers', 'x-total-count');
  res.setHeader('x-total-count', count);

  return res.status(StatusCodes.OK).json(result);
};
