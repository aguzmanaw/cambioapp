const getValue = (element, key) => {
  return (typeof element === "object" ? element?.[key] : element) ?? null;
};

export const mapResponseJsonToCustomer = (data) => {
  return data.map((responseJson) => {
    return {
      id: responseJson.id,
      dni: responseJson.dni,
      countryName: getValue(responseJson?.country, "name"),
      countryId: getValue(responseJson?.country, "id"),
      firstname: responseJson.name,
      lastname: responseJson.last_name,
      phone: responseJson.phone,
      email: responseJson.email ?? "",
      address: responseJson.address ?? "",
      jobName: getValue(responseJson.job, "name"),
      jobId: getValue(responseJson.job, "id"),
      description: responseJson.description ?? "",
      userId: responseJson.user_id,
      creationAt: responseJson.created_at,
      updatedAt: responseJson.updated_at,
    };
  });
};
