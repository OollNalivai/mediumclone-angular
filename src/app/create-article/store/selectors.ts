import { AppStateInterface } from '../../shared/types/app-state.interface'
import { createSelector } from '@ngrx/store'
import { CreateArticleStateInterface } from '../types/create-artice-state.interface'

export const createArticleFeatureSelector =
  (state: AppStateInterface): CreateArticleStateInterface => state.createArticle

export const isSubmittingSelector =
  createSelector(createArticleFeatureSelector,
    (createArticleState: CreateArticleStateInterface) => createArticleState.isSubmitting)

export const validationErrorsSelector =
  createSelector(createArticleFeatureSelector,
    (createArticleState: CreateArticleStateInterface) => createArticleState.validationErrors)
