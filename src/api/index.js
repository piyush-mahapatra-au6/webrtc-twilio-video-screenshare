import axios from "axios";

export const getToken = async (user) =>
	axios.get("https://ishva.herokuapp.com/token/", {
		params: {
			user,
		},
	});
