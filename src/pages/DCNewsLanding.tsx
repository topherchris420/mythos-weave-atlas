import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';

const DCNewsLanding = () => {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue === '401') {
      navigate('/mythos');
    }
  };

  const newsArticles = [
    {
      id: 1,
      headline: "Metro Announces New Purple Line Extension Plans",
      snippet: "WMATA officials unveiled comprehensive plans for extending the Purple Line through downtown DC, connecting Silver Spring to Bethesda with new stations planned for H Street and Capitol Hill areas.",
      category: "Transportation",
      time: "2 hours ago"
    },
    {
      id: 2,
      headline: "Cherry Blossom Festival Sets Record Attendance",
      snippet: "The National Cherry Blossom Festival concluded with over 1.5 million visitors, marking the highest attendance in the event's history. Peak bloom lasted an unprecedented 12 days this year.",
      category: "Culture",
      time: "4 hours ago"
    },
    {
      id: 3,
      headline: "Capitol Hill Farmers Market Expands Weekend Hours",
      snippet: "Eastern Market's popular farmers market will now operate Saturday and Sunday mornings year-round, featuring local vendors from Maryland and Virginia farms.",
      category: "Local Business",
      time: "6 hours ago"
    },
    {
      id: 4,
      headline: "Smithsonian Opens New Climate Change Exhibition",
      snippet: "The National Museum of Natural History unveils 'Our Planet's Future,' an interactive exhibition exploring climate science and environmental solutions.",
      category: "Science",
      time: "8 hours ago"
    },
    {
      id: 5,
      headline: "DC Housing Authority Announces Affordable Units",
      snippet: "Mayor announces 500 new affordable housing units across Wards 6, 7, and 8, with applications opening next month for income-qualified residents.",
      category: "Housing",
      time: "12 hours ago"
    },
    {
      id: 6,
      headline: "Georgetown Waterfront Park Renovation Complete",
      snippet: "The historic waterfront park reopens with new walking trails, improved lighting, and enhanced public art installations celebrating DC's maritime heritage.",
      category: "Parks",
      time: "1 day ago"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">DC Local News</h1>
              <p className="text-muted-foreground mt-1">Your source for Washington, DC area news and events</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-sm">
                Live Updates
              </Badge>
              <span className="text-xs text-muted-foreground">4</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Featured Article */}
        <section className="mb-12">
          <Card className="overflow-hidden">
            <div className="p-8">
              <Badge className="mb-4">Breaking News</Badge>
              <h2 className="text-3xl font-bold mb-4 text-foreground">
                DC Council Approves Major Infrastructure Investment
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                The DC Council unanimously approved a $2.8 billion infrastructure package focusing on roads, bridges, and public transportation improvements. The plan includes major upgrades to the Rock Creek Parkway and expansion of bike lanes throughout the district.
              </p>
              <div className="flex items-center text-sm text-muted-foreground">
                <span>Published 30 minutes ago</span>
                <span className="mx-2">•</span>
                <span>City Politics</span>
                <span className="mx-2">•</span>
                <span className="text-xs">0</span>
              </div>
            </div>
          </Card>
        </section>

        {/* News Grid */}
        <section className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 text-foreground">Latest News</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsArticles.map((article) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="text-xs">
                      {article.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{article.time}</span>
                  </div>
                  <CardTitle className="text-lg leading-tight mb-3">
                    {article.headline}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {article.snippet}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Search Section */}
        <section className="mb-8">
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Search Local News</CardTitle>
              <p className="text-muted-foreground">
                Find articles, events, and updates from around the DC area
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="password"
                    placeholder="Search news, events, neighborhoods..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>
                <Button type="submit" className="w-full h-12">
                  Search News
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-3 text-foreground">Local News</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Capitol Hill</li>
                <li>Georgetown</li>
                <li>Dupont Circle</li>
                <li>Adams Morgan</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-foreground">Government</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>DC Council</li>
                <li>Mayor's Office</li>
                <li>Federal Updates</li>
                <li>Public Records</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-foreground">Events</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Cultural Events</li>
                <li>Food & Dining</li>
                <li>Sports</li>
                <li>Community</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-foreground">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Weather</li>
                <li>Traffic</li>
                <li>Metro Updates</li>
                <li>Emergency Alerts</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 DC Local News. All rights reserved. <span className="text-xs">1</span></p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DCNewsLanding;