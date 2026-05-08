export const mapUsersToRequestJson = (users) => {
  return users.map((user) => ({
    id: user?.id,
    role: user?.role,
    corporate_email: user?.email,
    password: user?.password,
    dni: user?.dni,
    name: user?.firstname,
    last_name: user?.lastname,
    country_id: user?.countryId,
    phone: user?.phone,
    address: user?.address,
    description: user?.description,
  }));
};
