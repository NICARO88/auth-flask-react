const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: "Hello Mario!",
			token: null, 
			isAuthenticated: false, 
		},
	
		actions: {
			
			handleSignup: async (email, password, navigate) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/register", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({ email, password })
					});
			
					if (!response.ok) {
						const errorData = await response.json();
						throw new Error(errorData.msg || "Error during registration");
					}
			
					navigate("/login");
					return "User registered successfully!";
				} catch (error) {
					console.error("Registration error:", error.message);
					return error.message;
				}
			},
			


			handleLogin: async (email, password, navigate) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/login", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({ email, password })
					});
			
					if (!response.ok) {
						const errorData = await response.json();
						throw new Error(errorData.msg || "Error during login");
					}
			
					const data = await response.json();
					localStorage.setItem("token", data.access_token);
					setStore({ token: data.access_token, isAuthenticated: true });
			
					// Redirige a /private
					navigate("/private");
					return "Login successful!";
				} catch (error) {
					console.error("Login error:", error.message);
					return error.message;
				}
			},
			
			
			verifyToken: async () => {
				const store = getStore();
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/private", {
						method: "GET",
						headers: {
							Authorization: `Bearer ${store.token}`,
						},
					});
			
					if (!response.ok) {
						throw new Error("Token invalid or expired");
					}
			
					console.log("Token is valid");
					return true; // El token es válido
				} catch (error) {
					console.error("Token verification error:", error.message);
					return false; // El token no es válido
				}
			},
			
			logout: (navigate) => {
				localStorage.removeItem("token");
				setStore({ token: null, isAuthenticated: false });
				navigate("/login");
			},
			
		}
	};
};

export default getState;
