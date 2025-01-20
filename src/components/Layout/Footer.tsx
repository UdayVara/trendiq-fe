import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PageContainer from "./PageContainer";

export default function Footer() {

  return (
    <div>
      <footer className="bg-gray-100 py-12">
        <PageContainer>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-4 text-red-600">
                  Shop
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:text-red-600">
                      New Arrivals
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-red-600">
                      Statement Tees
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-red-600">
                      Bold Hoodies
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-red-600">
                      Edgy Jeans
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-red-600">
                      Fierce Accessories
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-4 text-red-600">
                  Customer Service
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:text-red-600">
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-red-600">
                      Shipping & Returns
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-red-600">
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-red-600">
                      Size Guide
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-4 text-red-600">
                  About TrendIQ
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:text-red-600">
                      Our Story
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-red-600">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-red-600">
                      Press
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-red-600">
                      Sustainability
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-4 text-red-600">
                  Stay Connected
                </h3>
                <p className="mb-4">
                  Subscribe to our newsletter for exclusive fashion offers and
                  updates.
                </p>
                <form className="flex gap-2">
                  <Input type="email" placeholder="Enter your email" />
                  <Button
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    Subscribe
                  </Button>
                </form>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t text-center">
              <p>&copy; 2024 TrendIQ. All rights reserved.</p>
            </div>
          </div>
        </PageContainer>
      </footer>
    </div>
  );
}
