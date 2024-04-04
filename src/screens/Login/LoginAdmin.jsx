import React, { useState } from 'react'
import './Login.css'
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import { Login } from "../../service/AuthService";
import { useForm } from 'react-hook-form';
import {useAuth} from "../../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import LoadingModal from '../../components/loading/LoadingModal';



const schema = yup.object({
  username: yup.string().required("Vui lòng nhập tên tài khoản"),
  password: yup.string().required("Vui lòng nhập mật khẩu"),
})

const LoginAdmin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: {errors},
    resetField
  } = useForm({
      resolver: yupResolver(schema)
  })

  const { login } = useAuth();
  const handleLogin = async (data, e) => {
      e.preventDefault();
      setLoading(true); // Bắt đầu hiển thị loading khi bắt đầu xử lý

      try {
          const loggedIn = await Login(data.username, data.password);
          if (loggedIn) {
              login();
              navigate("/dashboard/orders");
          } else {
              toast.error("Tên tài khoản hoặc mật khẩu bị sai");
              resetField("password")
          }
      } catch (error) {
          toast.error("Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.");
          console.error("Error logging in:", error);
      } finally {
          setLoading(false); // Tắt trạng thái loading sau khi xử lý hoàn tất (bất kể thành công hay thất bại)
      }

  };


  return (
    <>
    <LoadingModal loading={loading} />
    <div class="container-xxl">
      <div class="authentication-wrapper authentication-basic container-p-y">
        <div class="authentication-inner">
          {/* <!-- Register --> */}
          <div class="card">
            <div class="card-body">
              {/* <!-- Logo --> */}
              <div class="app-brand justify-content-center">
                  
              </div>
              {/* <!-- /Logo --> */}
              <h4 class="mb-2">Welcome to HouseMaid! 👋</h4>
              <p class="mb-4">Please sign-in to your account and start the adventure</p>

              <form onSubmit={handleSubmit(handleLogin)} className="needs-validation">
                <div class="mb-3">
                  <input
                    type="text"
                    className={`form-control
                      ${errors?.username?.message ? "is-invalid" : ""}`}
                    {...register("username")}
                    placeholder="Tên tài khoản"
                    autofocus
                  />
                  <span className="invalid-feedback">{errors?.username?.message}</span>
                </div>
                <div class="mb-3 form-password-toggle">
                    <input
                      type="password"
                      className={`form-control form-control-lg fs-6 
                                ${errors?.password?.message ? "is-invalid" : ""}`}
                            {...register("password")}
                      placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                      aria-describedby="password"
                    />
                  <span className="invalid-feedback">{errors?.password?.message}</span>

                </div>
                <div class="mb-3">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="remember-me" />
                    <label class="form-check-label" for="remember-me"> Remember Me </label>
                  </div>
                </div>
                <div class="mb-3">
                  <button class="btn btn-primary d-grid w-100" type="submit">Sign in</button>
                </div>
              </form>
            </div>
          </div>
          {/* <!-- /Register --> */}
        </div>
      </div>
    </div>
    </>
  )
}

export default LoginAdmin