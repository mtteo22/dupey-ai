import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { query } = await req.json();

  const mockResults = [
    {
      title: "Thymes Olive Leaf Body Lotion (9.25 oz)",
      mainPrices: [
        { retailer: "Amazon", price: "$21.50", link: "#" },
        { retailer: "Walmart", price: "$18.97", link: "#" },
        { retailer: "Target", price: "$19.99", link: "#" },
        { retailer: "Dermstore", price: "$22.50", link: "#" },
        { retailer: "Ulta", price: "$24.99", link: "#" },
        { retailer: "Sephora", price: "$26.00", link: "#" },
      ],
      savingsPercent: 42,
      analysis: "Based on my analysis of Thymes Olive Leaf Body Lotion, the key comparable metrics are scent profile (fresh olive leaf), moisturizing ingredients (shea butter + olive oil), and absorption rate.",
      dupes: [
        {
          dupeNumber: 1,
          name: "Tree Hut Olive & Coconut Moisturizing Body Lotion (8 oz)",
          prices: [
            { retailer: "Amazon", price: "$9.99", link: "#" },
            { retailer: "Walmart", price: "$10.49", link: "#" },
            { retailer: "Target", price: "$11.99", link: "#" },
          ],
        },
        {
          dupeNumber: 2,
          name: "Nivea Nourishing Body Lotion with Olive Oil (16.9 oz)",
          prices: [
            { retailer: "Walmart", price: "$6.97", link: "#" },
            { retailer: "Amazon", price: "$7.50", link: "#" },
          ],
        },
      ],
      additionalLinks: [
        { retailer: "Costco", price: "$14.99", link: "#" },
      ],
    },
  ];

  // Sort all price lists from lowest to highest
  mockResults[0].mainPrices.sort((a: any, b: any) => parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', '')));
  mockResults[0].dupes.forEach((dupe: any) => {
    dupe.prices.sort((a: any, b: any) => parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', '')));
  });

  return Response.json({ results: mockResults });
}