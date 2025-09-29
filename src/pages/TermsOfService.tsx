import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import Navigation from "@/components/Navigation"

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <Card variant="elegant" className="bg-black/25 border-pink-500/25 shadow-2xl rounded-2xl backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl md:text-4xl font-bold text-white text-center">
                Terms of Service
              </CardTitle>
              <p className="text-white/70 text-center mt-2">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <div className="text-white/90 space-y-6">
                <section>
                  <h2 className="text-2xl font-bold text-pink-300 mb-4">1. Acceptance of Terms</h2>
                  <p className="text-white/80 leading-relaxed">
                    By accessing and using ScratchSexPositions, you accept and agree to be bound by the terms and provision of this agreement. These terms apply to all visitors, users, and others who access or use the service.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-pink-300 mb-4">2. Use License</h2>
                  <p className="text-white/80 leading-relaxed">
                    Permission is granted to temporarily download one copy of the materials on ScratchSexPositions for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                  </p>
                  <ul className="text-white/80 leading-relaxed mt-2 space-y-1">
                    <li>• modify or copy the materials</li>
                    <li>• use the materials for any commercial purpose or for any public display</li>
                    <li>• attempt to reverse engineer any software contained on the website</li>
                    <li>• remove any copyright or other proprietary notations from the materials</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-pink-300 mb-4">3. User Content</h2>
                  <p className="text-white/80 leading-relaxed">
                    Users may create and submit content through admin features and blog functionality. By submitting content, you warrant that you have the right to submit such content and that it does not violate the rights of any third party.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-pink-300 mb-4">4. Age Restriction</h2>
                  <p className="text-white/80 leading-relaxed">
                    This application contains content intended for adults aged 18 and older. By using this service, you represent that you are at least 18 years old and that you are legally capable of entering into this agreement.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-pink-300 mb-4">5. Disclaimer</h2>
                  <p className="text-white/80 leading-relaxed">
                    The materials on ScratchSexPositions are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-pink-300 mb-4">6. Limitations</h2>
                  <p className="text-white/80 leading-relaxed">
                    In no event shall ScratchSexPositions or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on ScratchSexPositions, even if we or an authorized representative has been notified orally or in writing of the possibility of such damage.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-pink-300 mb-4">7. Content Accuracy</h2>
                  <p className="text-white/80 leading-relaxed">
                    The content provided on this application is for entertainment and educational purposes only. We do not guarantee the accuracy, completeness, or usefulness of any information. Users should exercise their own judgment and seek professional advice when appropriate.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-pink-300 mb-4">8. Modifications</h2>
                  <p className="text-white/80 leading-relaxed">
                    We may revise these terms of service at any time without notice. By using this application, you are agreeing to be bound by the then current version of these terms of service.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-pink-300 mb-4">9. Governing Law</h2>
                  <p className="text-white/80 leading-relaxed">
                    These terms and conditions are governed by and construed in accordance with applicable laws, and you irrevocably submit to the exclusive jurisdiction of the courts in that jurisdiction.
                  </p>
                </section>

                <div className="mt-8 p-4 bg-pink-500/10 border border-pink-500/20 rounded-lg">
                  <p className="text-pink-200 text-sm">
                    <strong>Important:</strong> Always prioritize consent, communication, and safety in all intimate activities. This application is for entertainment purposes only.
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

export default TermsOfService
