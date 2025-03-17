import { api } from "../../Config/Api"
import { CREATE_INGREDIENT_CATEGORY_SUCCESS, CREATE_INGREDIENT_SUCCESS, GET_INGREDIENT_CATEGORY_SUCCESS, GET_INGREDIENTS, UPDATE_STOCK } from "./ActionTypes";

export const getIngredientsOfRestaurant = ({ id, jwt }) => {
    return async (dispatch) => {
        try {
            const response = await api.get(`/api/admin/ingredients/restaurant/${id}`, {
                headers: {
                    Authorization : `Bearer ${jwt}`,
                },
            });
            dispatch({ type:GET_INGREDIENTS, payload:response.data })
            console.log("get all ingredients ", response.data)
        } catch (error) {
            console.log("error ", error);
        }
    };
};

export const createIngredient = ({ data, jwt }) => {
    return async (dispatch) => {
        try {
            const response = await api.post(`/api/admin/ingredients`, data, {
                headers: {
                    Authorization : `Bearer ${jwt}`,
                },
            });
            dispatch({ type:CREATE_INGREDIENT_SUCCESS, payload:response.data })
            console.log("create ingredients ", response.data)
        } catch (error) {
            console.log("create ingredients error ", error);
        }
    };
};

export const createIngredientCategory = ({ data, jwt }) => {
    console.log("data ", data, "jwt ", jwt);
    return async (dispatch) => {
        try {
            const response = await api.post(`/api/admin/ingredients/category`, data, {
                headers: {
                    Authorization : `Bearer ${jwt}`,
                },
            });
            dispatch({ type:CREATE_INGREDIENT_CATEGORY_SUCCESS, payload:response.data })
            console.log("create ingredients category ", response.data)
        } catch (error) {
            console.log("error ", error);
        }
    };
};

export const getIngredientCategory = ({ id, jwt }) => {
    return async (dispatch) => {
        try {
            const response = await api.get(`/api/admin/ingredients/restaurant/${id}/category`, {
                headers: {
                    Authorization : `Bearer ${jwt}`,
                },
            });
            dispatch({ type:GET_INGREDIENT_CATEGORY_SUCCESS, payload:response.data })
            console.log("get ingredients category ", response.data)
        } catch (error) {
            console.log("error ", error);
        }
    };
};

export const updateStockOfIngredient = ({ id, jwt }) => {
    return async (dispatch) => {
        try {
            const { data } = await api.put(`/api/admin/ingredients/${id}/stock`, {}, {
                headers: {
                    Authorization : `Bearer ${jwt}`,
                },
            });
            dispatch({ type:UPDATE_STOCK, payload:data })
            console.log("update ingredients stock ", data)
        } catch (error) {
            console.log("error ", error);
        }
    };
};