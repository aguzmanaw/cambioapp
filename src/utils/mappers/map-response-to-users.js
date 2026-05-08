export const mapResponseJsonToUsers = (data) => {
  return data.map((data) => ({
    id: data?.id,
    dni: data?.dni,
    firstname: data?.name,
    lastname: data?.last_name,
    phone: data?.phone,
    address: data?.address,
    description: data?.description,
    role: data?.role,
    email: data?.corporate_email,
    online: data?.online,
    countryName: data?.country?.name,
    countryId: data?.country?.id,
    countryCode: data?.country?.code,
    createdBy: data?.managed_by?.corporate_email,
  }));
};
