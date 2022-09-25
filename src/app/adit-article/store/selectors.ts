import { createSelector } from '@ngrx/store'
import { EditArticleStateInterface } from '../types/edit-article-state.interface'
import { AppStateInterface } from '../../shared/types/app-state.interface'

export const editArticleFeatureSelector =
  (state: AppStateInterface): EditArticleStateInterface => state.editArticle

export const isSubmittingSelector =
  createSelector(editArticleFeatureSelector,
    (editArticleState: EditArticleStateInterface) => editArticleState.isSubmitting)

export const isLoadingSelector =
  createSelector(editArticleFeatureSelector,
    (editArticleState: EditArticleStateInterface) => editArticleState.isLoading)

export const validationErrorsSelector =
  createSelector(editArticleFeatureSelector,
    (editArticleState: EditArticleStateInterface) => editArticleState.validationErrors)

export const articleSelector =
  createSelector(editArticleFeatureSelector,
    (editArticleState: EditArticleStateInterface) => editArticleState.article)
