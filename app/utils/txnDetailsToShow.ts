interface TxnData {
  _id?: string;
  message?: string;
  status?: string;
  createdAt?: string | Date;
  merchantId?: string;
  orderId?: string;
  firstName?: string;
  lastName?: string;
  generatedLink?: boolean;
  fromAmount?: number;
  type?: string;
  email?: string;
  phone?: string;
  street1?: string;
  city?: string;
  country?: string;
  postal_code?: string;
}

export const txnDetailsToShow = (txnData:TxnData = {}) => {
  const {
    _id,
    message,
    status,
    createdAt,
    // merchantId,
    orderId,
    firstName,
    lastName,
    // generatedLink,
    fromAmount,
    type,
    email,
    phone,
    street1,
    city,
    country,
    postal_code,
  } = txnData;

  const fullName = [firstName, lastName].filter(Boolean).join(" ") || "N/A";
  const address =
    [street1, city, country, postal_code].filter(Boolean).join(", ") || "N/A";
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      })
    : "N/A";

  return {
    "Transaction ID": _id ?? "N/A",
    Message: message ?? "N/A",
    Status: status ?? "N/A",
    Date: formattedDate,
    OrderId: orderId ?? "N/A",
    "Full Name": fullName,
    // "Is Generated Link": generatedLink ? "Yes" : "No",
    Amount: fromAmount ?? "N/A",
    Type: type ?? "N/A",
    Email: email ?? "N/A",
    Phone: phone ?? "N/A",
    Address: address,
  };
};
