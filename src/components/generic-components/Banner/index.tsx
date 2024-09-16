
import "./Banner.css"
import BannerZero from "../../../assets/banner-0.jpg";
import BannerOne from "../../../assets/banner-1.jpg";
import BannerTwo from "../../../assets/banner-2.jpg";

function BannerIndicator(props: any) {
  return (
    <button
      type="button"
      data-bs-target="#bannerIndicators"
      data-bs-slide-to={props.index}
      className={props.active ? "active" : ""}
      aria-current={props.active}
    />
  );
}

function BannerImage(props: any) {
  return (
    <div
      className={"carousel-item " + (props.active ? "active" : "")}
      data-bs-interval="5000"
    >
      <div
        className="ratio"
        style={{ aspectRatio: "2 / 1", maxHeight: "460px" }}
      >
        <img
          className="d-block w-100 h-100 bg-dark cover"
          alt=""
          src={props.image}
        />
      </div>
      <div className="carousel-caption d-none d-lg-block">
        <h5>Banner Header</h5>
        <p>Some representative placeholder content for the banner.</p>
      </div>
    </div>
  );
}

function Banner() {
  return (
    <div >
      <div
        id="bannerIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
        style={{ marginTop: "56px" }}
      >
        <div className="carousel-indicators">
          <BannerIndicator index="0" active={true} />
          <BannerIndicator index="1" />
          <BannerIndicator index="2" />
        </div>
        <div className="carousel-inner">
          <BannerImage image={BannerZero} active={true} />
          <BannerImage image={BannerOne} />
          <BannerImage image={BannerTwo} />
        </div>
      </div>
    </div>
  );
}

export default Banner;
