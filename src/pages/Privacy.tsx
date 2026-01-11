import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link 
            to="/" 
            className="p-2 rounded-xl hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Privacy Policy</h1>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <section>
            <h2 className="text-lg font-bold text-foreground mb-2">Overview</h2>
            <p className="text-muted-foreground">
              Cat Care Tracker is committed to protecting your privacy. This policy explains 
              how we handle your data — or rather, how we don't collect it at all.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-2">Data Storage</h2>
            <p className="text-muted-foreground">
              All data you enter in Cat Care Tracker is stored locally on your device using 
              your browser's local storage. This means:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
              <li>Your cat profiles stay on your device</li>
              <li>Daily check records never leave your phone</li>
              <li>No account or sign-up is required</li>
              <li>No data is transmitted to any server</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-2">Data Collection</h2>
            <p className="text-muted-foreground">
              We do <strong>not</strong> collect any personal information, usage analytics, 
              or tracking data. The app works entirely offline and does not make any network 
              requests to external services.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-2">Third-Party Services</h2>
            <p className="text-muted-foreground">
              Cat Care Tracker does not integrate with any third-party analytics, advertising, 
              or tracking services. Your usage of the app remains completely private.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-2">Data Deletion</h2>
            <p className="text-muted-foreground">
              Since all data is stored locally, you can delete it at any time by:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
              <li>Deleting individual cat profiles within the app</li>
              <li>Clearing your browser's local storage</li>
              <li>Uninstalling the app</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-2">Children's Privacy</h2>
            <p className="text-muted-foreground">
              Cat Care Tracker does not knowingly collect information from children. Since we 
              don't collect any data, this concern is not applicable to our app.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-2">Changes to This Policy</h2>
            <p className="text-muted-foreground">
              If we make changes to this privacy policy, we will update this page. Since all 
              data remains on your device, any changes to the app won't affect your existing data.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-2">Contact</h2>
            <p className="text-muted-foreground">
              If you have any questions about this privacy policy, please reach out through 
              the app store listing where you downloaded Cat Care Tracker.
            </p>
          </section>
        </div>

        {/* Last Updated */}
        <p className="text-xs text-center text-muted-foreground mt-8">
          Last updated: January 2026
        </p>
      </div>
    </div>
  );
};

export default Privacy;