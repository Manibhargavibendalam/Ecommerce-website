import { filterOptions } from "@/config";
import { Fragment } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

function ProductFilter({ filters, handleFilter }) {
  return (
    <div className="bg-gradient-to-br from-white to-purple-50 rounded-xl shadow-lg border border-purple-100">
      <div className="p-4 border-b border-purple-200">
        <h2 className="text-lg font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Filters</h2>
      </div>
      <div className="p-4 space-y-6">
      {Object.keys(filterOptions).map((keyItem) => (
        <Fragment key={keyItem}>
          <div className="space-y-3">
            <h3 className="font-extrabold text-purple-700 text-base capitalize">{keyItem}</h3>
            <div className="grid gap-3 ml-2">
              {filterOptions[keyItem].map((option) => (
                <Label key={option.id} className="flex font-medium items-center gap-3 cursor-pointer hover:text-purple-600 transition-colors">
                  <Checkbox
                    checked={
                      filters &&
                      Object.keys(filters).length > 0 &&
                      filters[keyItem] &&
                      filters[keyItem].indexOf(option.id) > -1
                    }
                    onCheckedChange={() => handleFilter(keyItem, option.id)}
                  />
                  <span>{option.label}</span>
                </Label>
              ))}
            </div>
          </div>
          <Separator className="bg-purple-100" />
        </Fragment>
      ))}
      </div>
    </div>
  );
}

export default ProductFilter;
