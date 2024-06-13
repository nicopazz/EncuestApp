import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Col, Form, InputGroup } from "react-bootstrap";
import {
  container,
  inputFieldName,
  inputField,
  inputField2,
  inputField3,
  submitBtn,
  hiddenButton,
  hiddenButtonConfirm,
} from "./formRegister.module.css";
import { passwordRegex } from "../../utils/passwordRegex.js";
import { emailRegex } from "../../utils/emailRegex.js";
import { alertcustom } from "../../utils/alertCustom.js";
import { messages } from "../../utils/message.js";
import "animate.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { FormCard } from "../ui/formcard/FormCard.jsx";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const DEFAULT_ROL = import.meta.env.VITE_DEFAULT_ROL;

export const FormRegister = () => {
  const form = useForm();
  const { register, control, handleSubmit, formState, watch } = form;
  const { errors } = formState;
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisibleConfirm, setPasswordVisibleConfirm] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const togglePasswordVisibilityConfirm = () => {
    setPasswordVisibleConfirm(!passwordVisibleConfirm);
  };

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const onSubmit = async (data) => {
    if (!passwordRegex.test(data.password)) {
      return alertcustom(
        "La contraseña debe tener: una mayuscula, una minuscula, un numero, un caracter, min 8 caracteres",
        "Error",
        "warning"
      );
    }

    try {
      const response = await fetch(`${BASE_URL}/signup`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          username: data.userName,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
          roles: DEFAULT_ROL,
        }),
      });

      if (!response.ok) {
        return alertcustom("", messages.emailRegister, "error");
      } else {
        Toast.fire({
          icon: "success",
          title: messages.userSuccessful,
        }).then(() => {
          navigate("/login");
        });
      }
    } catch (error) {
      console.log(error);
      if (error.code == "ERR_NETWORK") {
        alertcustom("Error de red", "Error", "warning");
      }
    }
  };

  return (
    <Col
      id={container}
      className=" d-flex justify-content-center animate__animated animate__backInLeft _formCard_7jj89_1"
    >
      <FormCard>
        <div className="text-center aling-items-center  pb-3 border border-light border-0 border-bottom">
          <div className="ms-4 text-start">
            <h1 className="display-5 fw-semibold text-white"> Register </h1>
          </div>
        </div>

        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Form.Group>
            <Form.Label className="fw-bold text-white">Username</Form.Label>
            <Form.Control
              id={inputFieldName}
              type="text"
              placeholder="Ingrese su username"
              className={errors.userName?.message ? "is-invalid" : ""}
              {...register("userName", {
                required: {
                  value: true,
                  message: "Ingrese un username",
                },
              })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.userName?.message}
            </Form.Control.Feedback>
          </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="fw-bold text-black">Correo electrónico</Form.Label>
          <Form.Control
            id={inputField}
            type="email"
            placeholder="Email"
            className={errors.email?.message ? "is-invalid" : ""}
            {...register("email", {
              required: {
                value: true,
                message: "Ingrese un email",
              },
              pattern: {
                value: emailRegex,
                message: "Ingrese un email valido",
              },
            })}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label className="fw-bold text-black">Contraseña</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              id={inputField2}
              name="password"
              type={passwordVisible ? "text" : "password"}
              aria-describedby="passwordHelpBlock"
              placeholder="Contraseña"
              className={errors.password?.message ? "is-invalid" : ""}
              {...register("password", {
                required: {
                  value: true,
                  message: "La contraseña es requerida",
                },
                pattern: {
                  value: passwordRegex,
                  message:
                    "Su contraseña debe contener como minimo 8 caracteres, una letra mayúscula, una minúscula, un numero, un caracter especial",
                },
              })}
              />
              <div className="input-group-append">
                <button
                  id={hiddenButton}
                  type="button"
                  className="toggle-password-visibility"
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon
                    icon={passwordVisible ? faEye : faEyeSlash}
                  />
                </button>
              </div>
              <Form.Control.Feedback type="invalid">
                {errors.password?.message}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

        <Form.Label className="fw-bold mt-3 text-black">
          Confirmar contraseña
        </Form.Label>
        <InputGroup>
          <Form.Control
            id={inputField3}
            name="password"
            onPaste={(e) => e.preventDefault()}
            type={passwordVisibleConfirm ? "text" : "password"}
            placeholder="Confirmar contraseña"
            className={errors.confirmPassword?.message ? "is-invalid" : ""}
            {...register("confirmarPassword", {
              required: {
                value: true,
                message: "Campo requerido",
              },
              validate: (value) => {
                if (value == watch("password")) {
                  return true;
                }
                return "Las contraseñas no coinciden";
              },
            })}
            />
            <div>
              <button
                id={hiddenButtonConfirm}
                type="button"
                className="toggle-password-visibility"
                onClick={togglePasswordVisibilityConfirm}
              >
                <FontAwesomeIcon
                  icon={passwordVisibleConfirm ? faEye : faEyeSlash}
                />
              </button>
            </div>
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword?.message}
            </Form.Control.Feedback>
          </InputGroup>

          <Button
            id={submitBtn}
            className="mt-3"
            variant="primary"
            type="submit"
          >
            Registrarse
          </Button>
        </Form>
      </FormCard>
    </Col>
  );
};
