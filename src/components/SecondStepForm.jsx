/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */

import { Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Option } from "antd/es/mentions";
import { useEffect, useState } from "react";

/* eslint-disable no-unused-vars */
const SecondStepForm = ({ data, updateFieldHandler }) => {
  const [valueAboutUs, setValueAboutUs] = useState("");
  const [problemOcurring, setProblemOcurring] = useState("");
  const [businees, setBusinees] = useState("");
  const [propertyHouse, setPropertyHouse] = useState("");

  useEffect(() => {
    // Verifique o valor de propertyHouse ao entrar na tela
    if (data.propertyHouse == "renter") {
      setPropertyHouse("renter");
    }
    if (data.residenceOrBusiness == "business") {
      setBusinees("business");
    }
  }, [propertyHouse, businees]);

  const bussinessInput = () => {
    return (
      <>
        <div className="form-control">
          <label htmlFor="bussinessName">Bussiness's Name</label>
          <Input
            type="bussinessName"
            name="bussinessName"
            id="bussinessName"
            placeholder="What is your Bussiness Name"
            required
            value={data.bussinessName || ""}
            onChange={(e) =>
              updateFieldHandler("bussinessName", e.target.value)
            }
          />
        </div>
        <div className="form-control">
          <label htmlFor="propertyHouse">
            Are you the Owner of the business, or do you have the permission to
            act on the owner’s behalf?
          </label>
          <Select
            value={data.propertyHouse || ""}
            onChange={(e) => {
              updateFieldHandler("propertyHouse", e);
              setPropertyHouse(e);
            }}
          >
            <option value="renter">
              I have permission to act on the owner’s behalf
            </option>
            <option value="owner">Owner</option>
          </Select>
        </div>
        {propertyHouse == "renter" ? (
          <>
            <div className="form-control">
              <label htmlFor="landordName">Owners's Name</label>
              <Input
                type="landordName"
                name="landordName"
                id="landordName"
                placeholder="What is the Owners Name"
                required
                value={data.landordName || ""}
                onChange={(e) =>
                  updateFieldHandler("landordName", e.target.value)
                }
              />
            </div>

            <div className="form-control">
              <label htmlFor="landordNumber">Owners's Phone Number</label>
              <Input
                type="landordNumber"
                name="landordNumber"
                id="landordNumber"
                placeholder="Owners Number"
                required
                value={data.landordNumber || ""}
                onChange={(e) =>
                  updateFieldHandler("landordNumber", e.target.value)
                }
              />
            </div>

            <div className="form-control">
              <label htmlFor="notify_landlord">
                Have you notified the Owners?
              </label>
              <Select
                value={data.notify_landlord || ""}
                onChange={(e) => {
                  updateFieldHandler("notify_landlord", e);
                }}
              >
                <Option value="yes">
                  Yes - The Owners has aggreed to this free estimate{" "}
                </Option>
                <Option value="no">No - I haven't notified my Owners.</Option>
              </Select>
            </div>
          </>
        ) : (
          ""
        )}
      </>
    );
  };

  const residenceInput = (propertyHouse) => {
    return (
      <>
        <div className="form-control">
          <label htmlFor="propertyHouse">
            Are you the Owner of the property OR Renter?
          </label>
          <Select
            value={data.propertyHouse || ""}
            onChange={(e) => {
              updateFieldHandler("propertyHouse", e);
              setPropertyHouse(e);
            }}
          >
            <option value="renter">Renter</option>
            <option value="owner">Owner</option>
          </Select>
        </div>
        {propertyHouse == "renter" ? (
          <>
            <div className="form-control">
              <label htmlFor="landordName">Landlord's Name</label>
              <Input
                type="landordName"
                name="landordName"
                id="landordName"
                placeholder="What is your Landord Name"
                required
                value={data.landordName || ""}
                onChange={(e) =>
                  updateFieldHandler("landordName", e.target.value)
                }
              />
            </div>

            <div className="form-control">
              <label htmlFor="landordNumber">Landlord's Phone Number</label>
              <Input
                type="landordNumber"
                name="landordNumber"
                id="landordNumber"
                placeholder="Digite o seu landordNumber"
                required
                value={data.landordNumber || ""}
                onChange={(e) =>
                  updateFieldHandler("landordNumber", e.target.value)
                }
              />
            </div>

            <div className="form-control">
              <label htmlFor="notify_landlord">
                Have you notified the landlord?
              </label>
              <Select
                value={data.notify_landlord || ""}
                onChange={(e) => {
                  updateFieldHandler("notify_landlord", e);
                }}
              >
                <Option value="yes">
                  Yes - My Landlord has aggreed to this free estimate{" "}
                </Option>
                <Option value="no">No - I haven't notified my landlord.</Option>
              </Select>
            </div>
          </>
        ) : (
          ""
        )}
      </>
    );
  };

  const handleTel = (event) => {
    let input = event.target.value;
    input = input.replace(/\D/g, "");
    input = input.substring(0, 10);

    const areaCode = input.substring(0, 3);
    const centralOfficeCode = input.substring(3, 6);
    const lineNumber = input.substring(6, 10);

    if (input.length > 6) {
      input = `(${areaCode}) ${centralOfficeCode}-${lineNumber}`;
    } else if (input.length > 3) {
      input = `(${areaCode}) ${centralOfficeCode}`;
    } else if (input.length > 0) {
      input = `(${areaCode}`;
    }

    updateFieldHandler("phoneNumber", input);
  };

  const handleTelRef = (event) => {
    let input = event.target.value;
    input = input.replace(/\D/g, "");
    input = input.substring(0, 10);

    const areaCode = input.substring(0, 3);
    const centralOfficeCode = input.substring(3, 6);
    const lineNumber = input.substring(6, 10);

    if (input.length > 6) {
      input = `(${areaCode}) ${centralOfficeCode}-${lineNumber}`;
    } else if (input.length > 3) {
      input = `(${areaCode}) ${centralOfficeCode}`;
    } else if (input.length > 0) {
      input = `(${areaCode}`;
    }

    updateFieldHandler("refPhone", input);
  };

  return (
    <div>
      <div className="form-control">
        <label htmlFor="email">Email</label>
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="Type your email"
          required
          value={data.email || ""}
          onChange={(e) => updateFieldHandler("email", e.target.value)}
        />
      </div>
      <div className="form-control">
        <label htmlFor="phoneNumber">Phone Number</label>
        <Input
          type="phoneNumber"
          name="phoneNumber"
          id="phoneNumber"
          placeholder="Type your Phone Number"
          required
          value={data.phoneNumber || ""}
          onChange={handleTel}
        />
      </div>
      <div className="form-control">
        <label htmlFor="residenceOrBusiness">
          Is this for a business or residence?
        </label>
        <Select
          className="ant-select"
          value={data.residenceOrBusiness || ""}
          onChange={(value) => {
            updateFieldHandler("residenceOrBusiness", value);
            setBusinees(value);
          }}
        >
          <Option value="business">Business</Option>
          <Option value="residence">Residence</Option>
        </Select>
      </div>

      {businees == "business" ? bussinessInput() : ""}
      {businees == "residence" ? residenceInput(propertyHouse) : ""}

      <div className="form-control">
        <label htmlFor="request_concerning">
          Is this free inspection request concerning issues with rats or mice?
        </label>
        <Select
          value={data.request_concerning || ""}
          onChange={(e) => {
            updateFieldHandler("request_concerning", e);
          }}
        >
          <Option value="no">No - I have problems with others animals</Option>
          <Option value="yes">
            Yes (I think) - I have problems with rats and mice adn would like to
            exterminate them.
          </Option>
        </Select>
        {data.request_concerning == "no" ? (
          <p>
            *Note: We do not service other animals at the time, including but
            not limited to racoons, bed bugs, etc
          </p>
        ) : (
          ""
        )}
      </div>

      <div className="form-control">
        <label htmlFor="problemOccurring">
          Where is the problem is occurring?
        </label>
        <Select
          value={data.problemOccurring || ""}
          onChange={(e) => {
            updateFieldHandler("problemOccurring", e);
            setProblemOcurring(e);
          }}
        >
          <Option value="outdoors">Outdoors (yard, trees, bushes)</Option>
          <Option value="inside">
            Inside(including the exterior of your house)
          </Option>
          <Option value="indoors">Indoors and Outdoors</Option>
        </Select>
        {problemOcurring == "outdoors" || problemOcurring == "indoors" ? (
          <p>
            *Note: We do not service outdoor areas such as yards, bushes and
            trees because that is considered within the natural habitat of the
            animals and it would be illegal for us to service. We only service
            the indoor area of the service address requested (including the
            exterior of your home).
          </p>
        ) : (
          ""
        )}
      </div>
      {data.problemOccurring == "outdoors" ||
      data.problemOccurring == "indoors" ? (
        <div className="form-control">
          <label htmlFor="onlyServiceIndoor">
            Do you understand that we only service indoor areas?
          </label>
          <Select
            value={data.onlyServiceIndoor || ""}
            onChange={(e) => {
              updateFieldHandler("onlyServiceIndoor", e);
            }}
          >
            <Option value="no">No, I don't understand</Option>
            <Option value="yes">Yes, I understand</Option>
          </Select>
        </div>
      ) : (
        ""
      )}

      <div className="form-control">
        <label htmlFor="aboutUs">How did you hear about us?</label>
        <Select
          value={data.aboutUs || ""}
          onChange={(e) => {
            updateFieldHandler("aboutUs", e);
            setValueAboutUs(e);
          }}
        >
          <Option value="google">Google</Option>
          <Option value="yelp">Yelp</Option>
          <Option value="diamond">Diamond Ciertified</Option>
          <Option value="facebook">Facebook</Option>
          <Option value="past">Past/Returning Customer</Option>
          <Option value="magazine">Magazine Ad</Option>
          <Option value="dirext">Direct Mail(Flyer/Postcard)</Option>
          <Option value="local">Local Mailer Pack(e.g., Valpak)</Option>
          <Option value="referral_real_estate_agent">
            {" "}
            Referral: Real Estate Agent
          </Option>
          <Option value="referral_neghbor_friend_family">
            Referral: Neighbor, Friend or Family
          </Option>
          <Option value="referral_contractor">Referral: Contractor</Option>
          <Option value="referral_friend_family">
            Referral: Neighbor, Friend or Family
          </Option>
          <Option value="other">Other</Option>
        </Select>
      </div>

      {valueAboutUs.substring(0, 8) == "referral" ? (
        <>
          <p>
            To be eligible for the Give $100, Get $100 Referral Program, please
            provide as many contact details as possible about your referrer
            (e.g., Name, Email, Phone Number, Address). To learn more about the
            referal program, <a href="https://alleycatusa.com/">Click Here</a>
          </p>

          <div className="form-control">
            <label htmlFor="refName">Referrer Name</label>
            <TextArea
              maxLength={100}
              type="refName"
              name="refName"
              id="refName"
              placeholder="Name"
              value={data.refName || ""}
              onChange={(e) => updateFieldHandler("refName", e.target.value)}
            />
          </div>

          <div className="form-control">
            <label htmlFor="refEmail">Referrer Email</label>
            <Input
              type="refEmail"
              name="refEmail"
              id="refEmail"
              placeholder="Email"
              value={data.refEmail || ""}
              onChange={(e) => updateFieldHandler("refEmail", e.target.value)}
            />
          </div>

          {/* Need to change this  */}
          <div className="form-control">
            <label htmlFor="refPhone">Phone Number</label>
            <Input
              type="refPhone"
              name="refPhone"
              id="refPhone"
              placeholder="Phone Number"
              value={data.refPhone || ""}
              onChange={handleTelRef}
            />
          </div>

          <div className="form-control">
            <label htmlFor="refAdress">Referrer Adress</label>
            <TextArea
              maxLength={100}
              type="refAdress"
              name="refAdress"
              id="refAdress"
              placeholder="Adress"
              value={data.refAdress || ""}
              onChange={(e) => updateFieldHandler("refAdress", e.target.value)}
            />
          </div>
        </>
      ) : (
        ""
      )}
      {valueAboutUs == "other" ? (
        <div className="form-control">
          <label htmlFor="otherAboutUs">
            Please specify (Name of Referrer)
          </label>
          <TextArea
            maxLength={100}
            type="otherAboutUs"
            name="otherAboutUs"
            id="otherAboutUs"
            placeholder="Tell us"
            required
            value={data.otherAboutUs || ""}
            onChange={(e) => updateFieldHandler("otherAboutUs", e.target.value)}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SecondStepForm;
