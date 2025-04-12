import { Request, Response, NextFunction } from 'express'
import { Document, Model as MongooseModel } from 'mongoose'
import { GLOBAL } from 'myapp'
import { Resp } from 'constant'

interface Model<T extends Document> extends MongooseModel<T> {}

const FILTERS = ['select', 'sort', 'page', 'limit']
export const advanceResult = (model: Model<any>, populate?: any) => async (req: Request, res: Response, next: NextFunction) => {
    let   query    = model.find()
    const reqQuery = { ...req.query }

    FILTERS.forEach((param) => delete reqQuery[param])
    query = query.find(reqQuery)

    if (req.query.select) {
        const fields = (req.query.select as string).split(',').join(' ')
        query = query.select(fields)
    }

    if (req.query.sort) {
        const sortBy = (req.query.sort as string).split(',').join(' ')
        query = query.sort(sortBy)
    } else {
        query = query.sort('name')
    }

    const page       = parseInt(req.query.page as any, 10) || GLOBAL.PAGINATION.DEFAULT_PAGE
    const limit      = parseInt(req.query.limit as any, 10) || GLOBAL.PAGINATION.LIMIT
    const startIndex = (page - 1) * limit
    const endIndex   = page * limit
    const total      = await model.countDocuments(reqQuery)
          query      = query.skip(startIndex).limit(limit)

    if (populate) {
        query = query.populate(populate)
    }

    const results = await query

    const pagination: IPagination = {}
    if (endIndex < total) {
        pagination.next = { page: page + 1, limit }
    }

    if (startIndex > 0) {
        pagination.prev = { page: page - 1, limit }
    }

    res.advanceResult = Resp.AdvancedResult(results, results.length, pagination)
    next()
}