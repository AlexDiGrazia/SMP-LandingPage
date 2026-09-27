export default function AboutKarl() {
  return (
    <section className="section--light" aria-label="About Karl">
      <div className="container about__grid">
        <div className="about__portrait">
          <span>portrait — Karl at work</span>
        </div>
        <div className="about__copy">
          <div className="eyebrow eyebrow--light">Your artist</div>
          <h2 className="h2">You&apos;ll talk to Karl. Start to finish.</h2>
          <p className="body-lg body-lg--light">
            [Short intro — years of experience, number of clients, training.] I personally review your photos, run
            your consultation, and perform every treatment. The person you call is the person holding the needle.
          </p>
          <div className="about__stats">
            <div>
              <div className="about__stat-value">[X]+</div>
              <div className="about__stat-label">years</div>
            </div>
            <div>
              <div className="about__stat-value">[X]+</div>
              <div className="about__stat-label">clients</div>
            </div>
            <div>
              <div className="about__stat-value">1</div>
              <div className="about__stat-label">artist</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
