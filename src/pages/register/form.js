/* eslint-disable jsx-a11y/anchor-is-valid */
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import logo from "../../img/logo-app.png";
import "./util/index.css";
import male from "../../img/males.png";
import {
  useApolloClient,
  useLazyQuery,
  useMutation,
} from "@apollo/react-hooks";
import { CREATE_REGISTER_DRIVERS } from "./apollo";
import {
  loadingData,
  messageSuccess,
  messageWarning,
  firstName,
  valiDate,
} from "../../helper";
import { v4 as uuidv4 } from "uuid";
import { s3Client } from "../../helper/s3Client";
import ListRouteLocation from "../../helper/components/ListRoutelocation";
export default function RegisterDriverPartner({ history }) {
  const [createRegister, { loading }] = useMutation(CREATE_REGISTER_DRIVERS);
  const [routeLocation, setListRouteLocation] = useState({});
  // state files
  const [imageFile, setImageFile] = useState("");
  const [closeFile, setCloseFile] = useState(null);
  // profiles
  const [imageName, setImageName] = useState("");
  const [file, setFile] = useState("");
  const handleUpload = async (event) => {
    const imageName = uuidv4() + "." + event.target.files[0].type.split("/")[1];
    const _file = event.target.files[0];
    setFile(_file);
    const res = await s3Client.uploadFile(_file, imageName);
    if (res?.location) {
      setFile(_file);
      setImageName(imageName);
      messageSuccess("ອັບໂຫຼດຮູບພາບສຳເລັດແລ້ວ");
    } else {
      setFile(null);
      setImageName("");
      messageWarning("ການອັບໂຫຼດຮູບພາບບໍ່ສຳເລັດ");
    }
  };
  // filse
  const subMitFiles = async (event) => {
    const _imageFile =
      uuidv4() + "." + event.target.files[0].type.split("/")[1];
    const _file = event.target.files[0];
    setCloseFile(_file);
    const res = await s3Client.uploadFile(_file, _imageFile);
    if (res?.location) {
      setCloseFile(_file);
      setImageFile(_imageFile);
      messageSuccess("ອັບໂຫຼດໄຟຣ໌ສຳເລັດແລ້ວ");
    } else {
      setCloseFile(null);
      setImageFile("");
      messageWarning("ອັບໂຫຼດໄຟຣ໌ບໍ່ສຳເລັດ");
    }
  };
  return (
    <div
      className="justify-content-md-center p-1"
      style={{ paddingBottom: 100, marginTop: 10 }}
    >
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          note: "",
          phoneNumber: "",
          vehicleDetails: "",
          note: "",
          gender: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.lastName) {
            errors.lastName = "ກະລຸນາປ້ອນນາມສະກຸມ";
          }
          if (!values.note) {
            errors.note = "ກະລຸນາປ້ອນປະສົບການ ຫຼື ຜົນງານ";
          }
          if (!values.vehicleDetails)
            errors.vehicleDetails = "ກະລຸນາປ້ອນລາຍລະອຽດລົດ";
          if (!values.firstName) errors.firstName = "ກະລຸນາປ້ອນຊື່";
          if (!values?.gender) errors.gender = "ກະບຸນາເລືອກເພດ";
          if (!imageFile) errors.files = "ກະລຸນາເລືອກໄຟຣ໌";
          if (!values.phoneNumber) errors.phoneNumber = "ກະລຸນາປ້ອນນາປ້ອນເບີໂທ";
          if (!routeLocation?._id) errors.routeID = "ກະລຸນາເລືອກສາຍລົດກ່ອນ";
          return errors;
        }}
        onSubmit={async (values) => {
          try {
            let _created = await createRegister({
              variables: {
                data: {
                  firstName: String(values?.firstName),
                  lastName: String(values?.lastName),
                  note: String(values?.note),
                  gender: String(values?.gender),
                  routeID: parseInt(routeLocation?._id),
                  profileImage: String((values.profileImage = imageName)),
                  files: String((values.files = imageFile)),
                },
              },
            });
            if (_created) {
              messageSuccess("ສົ່ງຟອມສະໝັກສຳເລັດແລ້ວ");
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            }
          } catch (error) {
            messageWarning("ສົ່ງຟອມສະໝັກຜິດພາດ");
          }
        }}
      >
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="card mt-1">
                  <div className="card-header">
                    <img src={logo} alt="logo" className="img-fluid" />
                  </div>
                  <div className="card-body">
                    <center>
                      <h2>ຟອມສະໝັກລົດຮ່ວມ</h2>
                    </center>
                    <hr />
                    <form className="form-horizontal">
                      <div className="form-group">
                        <label className="control-label">
                          ອັບໂຫຼດຮູບໂປຣໄຟຣ໌
                        </label>
                        <div style={{ textAlign: "center" }} for="file-upload">
                          <input
                            type="file"
                            id="file-upload"
                            className="bg-danger"
                            onChange={handleUpload}
                            hidden
                          />
                          <label htmlFor="file-upload" className="long-border">
                            {file ? (
                              <img
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                style={{ width: "170px", height: "180" }}
                              />
                            ) : (
                              <img
                                src={male}
                                style={{ width: "170px", height: "180px" }}
                              />
                            )}
                          </label>
                        </div>
                      </div>
                      <div className="row mt-1">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="control-label">
                              ຊື່ {valiDate()}
                            </label>
                            <div className="input-group">
                              <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="ປ້ອນຊື່ "
                                name="firstName"
                                required="required"
                                onChange={handleChange}
                                value={values.firstName}
                              />
                            </div>
                            <i className="text-danger mt-1">
                              {errors.firstName}
                            </i>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="control-label">
                              ນາມສະກຸມ{valiDate()}
                            </label>
                            <div className="input-group">
                              <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="ປ້ອນນາມສະກຸມ "
                                name="lastName"
                                required="required"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.lastName}
                              />
                            </div>
                            <i className="text-danger mt-1">
                              {errors.lastName}
                            </i>
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="control-label">ເພດ{valiDate()}</label>
                        <select
                          className="form-control form-control-lg"
                          name="gender"
                          onChange={handleChange}
                          value={values.gender}
                        >
                          <option value="">ເລືອກເພດ</option>
                          <option value="MALE">ຊາຍ</option>
                          <option value="FEMALE">ຍິງ</option>
                          <option value="OTHER">ບໍລະບຸ</option>
                        </select>
                        <i className="text-danger mt-1">{errors.gender}</i>
                      </div>
                      <div className="form-group">
                        <label className="control-label">
                          ເບີໂທ{valiDate()}
                        </label>
                        <div className="input-group">
                          <div class="input-group-prepend">
                            <span
                              className="input-group-text form-control-lg"
                              style={{
                                backgroundColor: "#ebe4e6",
                                borderTopLeftRadius: 8,
                                borderBottomLeftRadius: 8,
                              }}
                            >
                              +856 20
                            </span>
                          </div>
                          <input
                            type="number"
                            className="form-control form-control-lg"
                            placeholder="7678xxxx "
                            name="phoneNumber"
                            required="required"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.phoneNumber}
                            maxLength={8}
                          />
                        </div>
                        <i className="text-danger mt-1">{errors.phoneNumber}</i>
                      </div>
                      <div className="form-group">
                        <label className="control-label">
                          ເລືອກສາຍລົດ{valiDate()}
                        </label>
                        <ListRouteLocation
                          getData={(data) => {
                            setListRouteLocation(data);
                          }}
                          defaultValue={routeLocation?.title ?? ""}
                          size="lg"
                        />
                        <div className="text-danger mt-1">{errors.routeID}</div>
                      </div>
                      <div className="form-group">
                        <label className="control-label">
                          ລາຍລະອຽດຂໍ້ມູນລົດ{" "}
                        </label>
                        <textarea
                          className="form-control form-control-lg"
                          rows={3}
                          placeholder="ປ້ອນລາຍລະອຽດຂໍ້ມູນລົດ"
                          name="vehicleDetails"
                          required="required"
                          onChange={handleChange}
                          value={values.vehicleDetails}
                        ></textarea>
                        <i className="text-danger mt-1">
                          {errors.vehicleDetails}
                        </i>
                      </div>
                      <div className="form-group">
                        <label className="control-label">
                          ລາຍລະອຽດ (ຜົນງານ ແລະ ປະສົບການ){" "}
                        </label>
                        <textarea
                          className="form-control form-control-lg"
                          rows={5}
                          placeholder="ປ້ອນລາຍລະອຽດ"
                          name="note"
                          required="required"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.note}
                        ></textarea>
                        <i className="text-danger mt-1">{errors.note}</i>
                      </div>
                      <div className="form-group mb-3">
                        <label>ເລືອກໄຟຣ໌ເອກະສານ {valiDate()}</label>
                        <input
                          type="file"
                          className="form-control form-control-lg"
                          name="files"
                          required="required"
                          onChange={subMitFiles}
                          placeholder="ຮູບພາບໂປຣຟາຍ"
                        />
                        <i className="text-danger mt-1">{errors.files}</i>
                      </div>
                      <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={handleSubmit}
                        className="btn btn-block rounded btn-lg btn-primary"
                      >
                        <i className="fa-solid fa-paper-plane me-1" />{" "}
                        ຢືນຢັນສົ່ງຟອມ
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
}
