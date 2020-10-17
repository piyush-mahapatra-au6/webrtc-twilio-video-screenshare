import Swal from "sweetalert2";

export function Error(text) {
	return Swal.fire({
		icon: "error",
		text: text,
		confirmButtonText: "Try Again",
		position: "top",
	});
}

export function Success(text) {
	return Swal.fire({
		icon: "success",
		text: text,
		confirmButtonText: "Ok",
		position: "top",
	});
}

