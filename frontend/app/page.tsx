import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Shield, Search, Code, ChevronRight, ExternalLink } from "lucide-react";
import TopNavHome from "@/components/top-nav-home";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopNavHome />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black text-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Secure Your Digital Assets with Experts on Nolawi Bug Bounty
                    Hunters Hub
                  </h1>
                  <p className="max-w-[600px] text-gray-400 md:text-xl">
                    We find vulnerabilities before hackers do. Our elite team of
                    security researchers helps protect your business from cyber
                    threats.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Request a Security Audit
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-gray-700 bg-slate-600"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/images/homepage_image2.jpg?height=550&width=550"
                  width={550}
                  height={550}
                  alt="Cybersecurity visualization"
                  className="rounded-xl object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-16 lg:py-20 bg-gray-950">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:gap-12">
              <div className="flex flex-col items-center justify-center space-y-2 border-r border-gray-800 pr-6 last:border-r-0 last:pr-0">
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-gray-400">
                  Vulnerabilities Found
                </div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 border-r border-gray-800 pr-6 last:border-r-0 last:pr-0">
                <div className="text-3xl font-bold text-primary">100+</div>
                <div className="text-sm text-gray-400">Satisfied Clients</div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 border-r border-gray-800 pr-6 last:border-r-0 last:pr-0">
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-sm text-gray-400">Security Experts</div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="text-3xl font-bold text-primary">$2M+</div>
                <div className="text-sm text-gray-400">Client Savings</div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section
          id="services"
          className="w-full py-12 md:py-24 lg:py-32 bg-background"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Our Services
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Comprehensive Security Solutions
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We offer a range of specialized cybersecurity services to
                  protect your digital assets
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
              <div className="group relative overflow-hidden rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md">
                <div className="flex flex-col space-y-2">
                  <Search className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">
                    Vulnerability Assessment
                  </h3>
                  <p className="text-muted-foreground">
                    Comprehensive scanning and manual testing to identify
                    security weaknesses in your systems.
                  </p>
                </div>
                <div className="mt-4 flex items-center text-sm text-primary">
                  <span>Learn more</span>
                  <ChevronRight className="ml-1 h-4 w-4" />
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md">
                <div className="flex flex-col space-y-2">
                  <Code className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">Bug Bounty Programs</h3>
                  <p className="text-muted-foreground">
                    Managed bug bounty programs that connect your organization
                    with our elite security researchers.
                  </p>
                </div>
                <div className="mt-4 flex items-center text-sm text-primary">
                  <span>Learn more</span>
                  <ChevronRight className="ml-1 h-4 w-4" />
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md">
                <div className="flex flex-col space-y-2">
                  <Shield className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">Penetration Testing</h3>
                  <p className="text-muted-foreground">
                    Simulated cyber attacks to evaluate the security of your IT
                    infrastructure and applications.
                  </p>
                </div>
                <div className="mt-4 flex items-center text-sm text-primary">
                  <span>Learn more</span>
                  <ChevronRight className="ml-1 h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Top Stories Section */}
        <section
          id="stories"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-950 text-white"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Success Stories
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Recent Security Wins
                </h2>
                <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore our recent success stories and how we've helped
                  organizations strengthen their security posture
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="group relative overflow-hidden rounded-lg border border-gray-800 bg-gray-900 p-6 shadow-sm transition-all hover:shadow-md">
                <div className="flex flex-col space-y-2">
                  <div className="rounded-md bg-primary/10 px-2 py-1 text-xs text-primary w-fit">
                    Financial Services
                  </div>
                  <h3 className="text-xl font-bold">
                    Critical API Vulnerability Discovered
                  </h3>
                  <p className="text-gray-400">
                    Our team identified a critical authentication bypass in a
                    major banking application that could have exposed customer
                    data.
                  </p>
                </div>
                <div className="mt-4 flex items-center text-sm text-primary">
                  <span>Read case study</span>
                  <ExternalLink className="ml-1 h-4 w-4" />
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-lg border border-gray-800 bg-gray-900 p-6 shadow-sm transition-all hover:shadow-md">
                <div className="flex flex-col space-y-2">
                  <div className="rounded-md bg-primary/10 px-2 py-1 text-xs text-primary w-fit">
                    Healthcare
                  </div>
                  <h3 className="text-xl font-bold">Securing Patient Data</h3>
                  <p className="text-gray-400">
                    Helped a healthcare provider identify and fix multiple
                    vulnerabilities in their patient portal, ensuring HIPAA
                    compliance.
                  </p>
                </div>
                <div className="mt-4 flex items-center text-sm text-primary">
                  <span>Read case study</span>
                  <ExternalLink className="ml-1 h-4 w-4" />
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-lg border border-gray-800 bg-gray-900 p-6 shadow-sm transition-all hover:shadow-md">
                <div className="flex flex-col space-y-2">
                  <div className="rounded-md bg-primary/10 px-2 py-1 text-xs text-primary w-fit">
                    E-commerce
                  </div>
                  <h3 className="text-xl font-bold">Preventing Data Breach</h3>
                  <p className="text-gray-400">
                    Discovered and remediated a SQL injection vulnerability that
                    could have compromised millions of customer records.
                  </p>
                </div>
                <div className="mt-4 flex items-center text-sm text-primary">
                  <span>Read case study</span>
                  <ExternalLink className="ml-1 h-4 w-4" />
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-lg border border-gray-800 bg-gray-900 p-6 shadow-sm transition-all hover:shadow-md">
                <div className="flex flex-col space-y-2">
                  <div className="rounded-md bg-primary/10 px-2 py-1 text-xs text-primary w-fit">
                    Government
                  </div>
                  <h3 className="text-xl font-bold">
                    Securing Critical Infrastructure
                  </h3>
                  <p className="text-gray-400">
                    Conducted penetration testing for a government agency,
                    identifying and helping fix vulnerabilities in critical
                    systems.
                  </p>
                </div>
                <div className="mt-4 flex items-center text-sm text-primary">
                  <span>Read case study</span>
                  <ExternalLink className="ml-1 h-4 w-4" />
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-lg border border-gray-800 bg-gray-900 p-6 shadow-sm transition-all hover:shadow-md">
                <div className="flex flex-col space-y-2">
                  <div className="rounded-md bg-primary/10 px-2 py-1 text-xs text-primary w-fit">
                    Technology
                  </div>
                  <h3 className="text-xl font-bold">Cloud Security Overhaul</h3>
                  <p className="text-gray-400">
                    Helped a SaaS provider strengthen their cloud security
                    posture, preventing potential data exposure.
                  </p>
                </div>
                <div className="mt-4 flex items-center text-sm text-primary">
                  <span>Read case study</span>
                  <ExternalLink className="ml-1 h-4 w-4" />
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-lg border border-gray-800 bg-gray-900 p-6 shadow-sm transition-all hover:shadow-md">
                <div className="flex flex-col space-y-2">
                  <div className="rounded-md bg-primary/10 px-2 py-1 text-xs text-primary w-fit">
                    Retail
                  </div>
                  <h3 className="text-xl font-bold">Payment System Security</h3>
                  <p className="text-gray-400">
                    Identified critical vulnerabilities in a retail payment
                    processing system before they could be exploited.
                  </p>
                </div>
                <div className="mt-4 flex items-center text-sm text-primary">
                  <span>Read case study</span>
                  <ExternalLink className="ml-1 h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className="w-full py-12 md:py-24 lg:py-32 bg-background"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  What Our Clients Say
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hear from the organizations we've helped secure against cyber
                  threats
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-between space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <div className="space-y-2">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5 text-primary"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-muted-foreground">
                    "Nolawi's team identified critical vulnerabilities that our
                    internal team missed. Their expertise and thorough approach
                    to security testing has significantly improved our security
                    posture."
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="text-sm font-medium">Sarah Johnson</p>
                    <p className="text-xs text-muted-foreground">
                      CTO, FinTech Solutions
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <div className="space-y-2">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5 text-primary"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-muted-foreground">
                    "Working with Nolawi has been a game-changer for our
                    security program. Their managed bug bounty program has
                    helped us identify and fix vulnerabilities before they could
                    be exploited."
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="text-sm font-medium">Michael Chen</p>
                    <p className="text-xs text-muted-foreground">
                      CISO, E-commerce Giant
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <div className="space-y-2">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5 text-primary"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-muted-foreground">
                    "The security training provided by Nolawi has transformed
                    how our development team approaches security. We're now
                    building more secure applications from the ground up."
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="text-sm font-medium">Jessica Rodriguez</p>
                    <p className="text-xs text-muted-foreground">
                      VP of Engineering, SaaS Platform
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <div className="space-y-2">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5 text-primary"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-muted-foreground">
                    "After experiencing a security incident, we brought in
                    Nolawi to help strengthen our defenses. Their comprehensive
                    approach to security testing has given us confidence in our
                    systems."
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="text-sm font-medium">David Thompson</p>
                    <p className="text-xs text-muted-foreground">
                      Director of IT, Healthcare Provider
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
