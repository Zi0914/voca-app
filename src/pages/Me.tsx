import { Settings2, Globe, Info } from 'lucide-react';

export function Me() {
  return (
    <main className="screen">
      <section className="page-header">
        <div>
          <p className="eyebrow">Me</p>
          <h1>Profile and preferences</h1>
        </div>
      </section>

      <section className="card profile-card">
        <div className="profile-top">
          <div>
            <p className="tiny-label">Language</p>
            <h2>Mandarin speaker learning English</h2>
          </div>
        </div>
        <div className="profile-setting">
          <Settings2 size={18} />
          <div>
            <p>App preferences</p>
            <span>Warm mode, gentle reminders</span>
          </div>
        </div>
        <div className="profile-setting">
          <Globe size={18} />
          <div>
            <p>Target language</p>
            <span>English notes, natural Chinese support</span>
          </div>
        </div>
        <div className="profile-setting">
          <Info size={18} />
          <div>
            <p>About Pluma</p>
            <span>Save, translate, and repeat your English notes.</span>
          </div>
        </div>
      </section>
    </main>
  );
}
