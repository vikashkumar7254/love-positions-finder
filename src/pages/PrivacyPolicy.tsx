import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import Navigation from "@/components/Navigation"

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <Card variant="elegant" className="bg-black/25 border-pink-500/25 shadow-2xl rounded-2xl backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl md:text-4xl font-bold text-white text-center">
                Privacy Policy
              </CardTitle>
              <p className="text-white/70 text-center mt-2">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <div className="text-white/90 space-y-6">
                <section>
                  <h2 className="text-2xl font-bold text-pink-300 mb-4">1. Information We Collect</h2>
                  <p className="text-white/80 leading-relaxed">
                    We are committed to protecting your privacy. This app is designed for entertainment and educational purposes related to intimate relationships and positions. We do not collect personal information, browsing data, or any form of user data.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-pink-300 mb-4">2. Local Storage</h2>
                  <p className="text-white/80 leading-relaxed">
                    The application uses browser local storage to save your preferences and custom content you create (such as custom positions or blog posts). This data remains on your device and is not transmitted to our servers.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-pink-300 mb-4">3. Admin Features</h2>
                  <p className="text-white/80 leading-relaxed">
                    Admin functionality is password-protected and intended for authorized content creators only. Admin access allows management of blog posts, custom positions, and other site content.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-pink-300 mb-4">4. Third-Party Services</h2>
                  <p className="text-white/80 leading-relaxed">
                    This application uses Unsplash for stock images. These images are loaded directly from Unsplash's servers and are subject to their privacy policy. We do not track or store any information about image usage.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-pink-300 mb-4">5. Content Guidelines</h2>
                  <p className="text-white/80 leading-relaxed">
                    All content on this site is intended for adults 18+ and is for educational and entertainment purposes only. Users are responsible for ensuring content appropriateness for their use case.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-pink-300 mb-4">6. Changes to Privacy Policy</h2>
                  <p className="text-white/80 leading-relaxed">
                    We may update this privacy policy from time to time. Any changes will be posted on this page with an updated revision date.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-pink-300 mb-4">7. Contact Information</h2>
                  <p className="text-white/80 leading-relaxed">
                    If you have any questions about this privacy policy or the application, please use the contact information available in the application or reach out through the provided channels.
                  </p>
                </section>

                <div className="mt-8 p-4 bg-pink-500/10 border border-pink-500/20 rounded-lg">
                  <p className="text-pink-200 text-sm">
                    <strong>Disclaimer:</strong> This application is for entertainment and educational purposes only. Always prioritize consent, communication, and safety in all intimate activities.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default PrivacyPolicy
