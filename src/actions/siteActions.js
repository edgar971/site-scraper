import * as types from './actionTypes';
import SiteScraperAPI from '../helpers/SiteScraperAPI';
import {startAjaxCall, ajaxCallError} from './ajaxStatusActions';


export function loadSitesSuccess(sites) {
  return {
    type: types.LOAD_SITES_SUCCESS,
    sites
  }
}

export function addedSiteSuccess(site) {

  return {
    type: types.ADDED_SITE_SUCCESS,
    site
  }
}

export function siteInProcessSuccess() {

  return {
    type: types.PROCESSED_SITE_SUCCESSFUL
  }

}

export function siteInProcessError() {
  return {
    type: types.PROCESSED_SITE_ERROR
  }
}

export function loadSites() {
  return function (dispatch, getState) {

    dispatch(startAjaxCall());

    let {filters} = getState();

    return SiteScraperAPI.getAllSites(filters).then(res => {

      let sites = res.body.data;
      dispatch(loadSitesSuccess(sites));

    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });

  };

}



export function checkSiteProcess(site_id) {

  return function (dispatch, getState) {

    return SiteScraperAPI.getSite(site_id).then(res => {

      let site = res.body.data[0];

      if(!!site && site.processed) {

        dispatch(siteInProcessSuccess());

        return true;

      } else {

        return false;

      }


    }).catch(error => {

      dispatch(siteInProcessError());
      throw(error);

    });

  }

}

export function addSite(site) {
  return function (dispatch, getState) {
    dispatch(startAjaxCall());
    return SiteScraperAPI.addSite(site).then(res => {

      let site = res.body.data[0];
      dispatch(addedSiteSuccess(site));

    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });

  };
}
