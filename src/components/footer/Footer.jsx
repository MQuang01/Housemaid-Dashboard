const Footer = () => {
  return (
      <>
          <footer className="content-footer footer bg-footer-theme">
              <div
                  className="container-xxl d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
                  <div className="mb-2 mb-md-0">
                      <script>
                          document.write(new Date().getFullYear());
                      </script>
                      HomeMaid ❤️ by
                      <a href="#" 
                         className="footer-link fw-bolder"> Warrior Team</a>
                  </div>
                  <div>
                      <a href="#" className="footer-link me-4"
                         >License</a>
                      <a href="/"  className="footer-link me-4">More
                          Themes</a>
                      <a
                          href="#"  
                          className="footer-link me-4"
                      >Documentation</a
                      >
                      <a
                          href="#"      
                          className="footer-link me-4"
                      >Support</a
                      >
                  </div>
              </div>
          </footer>
      </>
  )
}
export default Footer;