/* eslint-disable react/no-unescaped-entities */
"use client"
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function AboutUs() {
  const [showFullStory, setShowFullStory] = useState(false)

  return (
    <section className="py-16 bg-gradient-to-b from-red-50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center text-red-600">About TrendIQ</h2>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-red-600">Our Story</h3>
            <p className="text-lg mb-4">
              Founded in 2020, TrendIQ was born out of a passion for bold fashion and a desire to make striking, high-quality clothing accessible to everyone. Our journey began when a group of fashion rebels came together with a shared vision: to create an online destination where trendsetters and style innovators could find the latest edgy fashion at affordable prices.
            </p>
            {!showFullStory && (
              <Button 
                onClick={() => setShowFullStory(true)}
                variant="ghost"
                className="text-red-600 hover:text-red-700 p-0"
              >
                Read More <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            )}
            {showFullStory && (
              <>
                <p className="text-lg mb-4">
                  What started as a small online boutique has now grown into a thriving fashion community, serving customers worldwide with a curated collection of clothes, t-shirts, hoodies, and accessories that help you make a statement with your unique style.
                </p>
                <p className="text-lg mb-4">
                  Today, TrendIQ stands at the forefront of fashion e-commerce, constantly pushing boundaries and redefining what it means to be stylish. Our team of passionate fashion experts work tirelessly to bring you the most cutting-edge designs and trends from around the world.
                </p>
                <Button 
                  onClick={() => setShowFullStory(false)}
                  variant="ghost"
                  className="text-red-600 hover:text-red-700 p-0"
                >
                  Read Less <ChevronUp className="ml-2 h-4 w-4" />
                </Button>
              </>
            )}
          </div>
          <div className="relative h-64 md:h-auto">
            <img 
              src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="TrendIQ Team" 
              className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>

        <Tabs defaultValue="mission" className="mb-12">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="mission">Our Mission</TabsTrigger>
            <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
            <TabsTrigger value="team">Our Team</TabsTrigger>
          </TabsList>
          <TabsContent value="mission" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <h4 className="text-xl font-semibold mb-2 text-red-600">Empowering Bold Expression</h4>
                <p>
                  At TrendIQ, our mission is to empower individuals to express themselves boldly through fashion. We believe that everyone deserves to stand out and feel confident, regardless of budget or body type. That's why we're committed to offering a diverse range of sizes, styles, and price points to ensure that there's something for every fashion rebel in our collection.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="sustainability" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <h4 className="text-xl font-semibold mb-2 text-red-600">Fashion with a Conscience</h4>
                <p>
                  We're passionate about fierce fashion, but we're also committed to reducing our environmental impact. That's why we're taking bold steps to incorporate more sustainable practices into our business. From using eco-friendly materials in our packaging to partnering with ethical manufacturers, we're constantly looking for ways to make fashion more sustainable without compromising on style.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="team" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <h4 className="text-xl font-semibold mb-2 text-red-600">Fashion Mavericks</h4>
                <p>
                  Our diverse team of fashion mavericks, tech innovators, and customer service professionals work tirelessly to bring you the most daring shopping experience possible. From our buyers who scour the globe for the latest trends to our developers who ensure a smooth online shopping experience, every member of the TrendIQ family is dedicated to helping you look bold and feel confident.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-4 text-red-600">Join Our Rebel Team</h3>
          <p className="text-lg mb-6">
            Are you passionate about fashion and want to be part of a dynamic, innovative team? We're always looking for talented individuals to join our fashion revolution.
          </p>
          <Button className="bg-red-600 hover:bg-red-700 text-white">
            View Open Positions
          </Button>
        </div>
      </div>
    </section>
  )
}

