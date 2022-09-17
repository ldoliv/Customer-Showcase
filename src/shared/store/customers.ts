
import {getLocalStore, setLocalStore} from "./helpers";
import {config} from 'shared/constants/config';
import type {ICustomer} from "shared/types/types";


const {LOCAL_APP_DATA} = config.localStoreKeys;


export const getStoredCustomers = (): ICustomer[] => {
	return getLocalStore(LOCAL_APP_DATA) || [];
}

export const storeCustomers = (customers: ICustomer[] = []) => {
	setLocalStore(LOCAL_APP_DATA, customers);
	return true;
}

