export const mapCustomerToRequestJson = (data) => {
  return data.map((customer) => {
    return {
      id: customer.id,
      dni: customer.dni,
      country_id: customer.countryId,
      name: customer.firstname,
      last_name: customer.lastname,
      phone: customer.phone,
      email: customer.email,
      address: customer.address,
      job_id: customer.jobId,
      description: customer.description,
    };
  });
};
