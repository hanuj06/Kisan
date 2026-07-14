import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../../data/mockData';
import ProductCard from '../product/ProductCard';

export default function FeaturedProducts() {
  const featured = PRODUCTS.filter(p => p.featured).slice(0, 6);
  const seasonal = PRODUCTS.filter(p => p.seasonal).slice(0, 4);

  return (
    <>
      {/* Featured */}
      <section className="section bg-kd-paper">
        <div className="container-kd">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-kd-green-100 text-kd-green-700 text-sm font-semibold mb-3">
                🌟 Featured
              </div>
              <h2 className="section-title">Today's Top Picks</h2>
              <p className="section-subtitle max-w-xl">
                Freshest produce, best prices — curated daily from our verified farmers.
              </p>
            </div>
            <Link
              to="/browse"
              className="hidden md:flex items-center gap-2 text-sm font-semibold text-kd-green-700 hover:text-kd-green-900 transition-colors"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <Link to="/browse" className="flex items-center gap-2 justify-center mt-8 btn-outline mx-auto w-fit md:hidden">
            View All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Seasonal */}
      <section className="section-sm bg-gradient-to-br from-kd-green-900 to-kd-earth">
        <div className="container-kd">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-kd-amber-400 text-sm font-semibold mb-3 border border-white/10">
                🌿 Seasonal Produce
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">In Season Right Now</h2>
              <p className="text-white/60 text-base mt-2">
                Seasonal produce is fresher, tastier, and more nutritious.
              </p>
            </div>
            <Link to="/browse?seasonal=true" className="hidden md:flex items-center gap-2 text-sm font-semibold text-kd-amber-400 hover:text-kd-amber-300 transition-colors">
              All Seasonal <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {seasonal.map(product => (
              <div key={product.id} className="relative group cursor-pointer overflow-hidden rounded-2xl aspect-square">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-kd-earth/90 via-kd-earth/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-bold text-sm">{product.name}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-mono text-kd-amber-400 font-bold">₹{product.price}/{product.unit}</span>
                    <Link
                      to={`/product/${product.id}`}
                      className="text-xs bg-white/20 hover:bg-kd-amber-500 text-white hover:text-kd-earth px-2 py-1 rounded-lg transition-all font-medium"
                    >
                      Order
                    </Link>
                  </div>
                </div>
                {product.organic && (
                  <div className="absolute top-3 left-3">
                    <span className="badge-organic text-[10px]">Organic</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
