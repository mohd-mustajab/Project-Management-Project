export function parseJwt(token) {
  if (!token) return null;

  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export function getUserRole() {
  const role = localStorage.getItem("role");
  if (role) return role;

  const token = localStorage.getItem("token");
  const payload = parseJwt(token);
  return payload?.role || "Member";
}

export function getUserName() {
  const name = localStorage.getItem("name");
  if (name) return name;

  const token = localStorage.getItem("token");
  const payload = parseJwt(token);
  return payload?.name || payload?.user?.name || "";
}

export function getUserEmail() {
  const email = localStorage.getItem("email");
  if (email) return email;

  const token = localStorage.getItem("token");
  const payload = parseJwt(token);
  return payload?.email || payload?.user?.email || "";
}

export function saveAuthInfo({ token, user, role }) {
  if (token) {
    localStorage.setItem("token", token);
    const payload = parseJwt(token);
    if (!role && payload?.role) role = payload.role;
    if (!user?.name && payload?.name) user = { ...user, name: payload.name };
    if (!user?.email && payload?.email) user = { ...user, email: payload.email };
  }

  if (user?.role) localStorage.setItem("role", user.role);
  if (user?.email) localStorage.setItem("email", user.email);
  if (user?.name) localStorage.setItem("name", user.name);
  if (role) localStorage.setItem("role", role);
}
