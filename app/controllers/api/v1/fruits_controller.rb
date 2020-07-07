module Api
    module V1
        class FruitsController < ApplicationController

            def index
                @fruits = Fruit.all
                render json: @fruits
            end

            def create
                @fruit = Fruit.new(fruit_params)
                if @fruit.save
                    render json: @fruit
                else 
                    render json: {errors: @fruit.errors}
                end
            end

            private
              def fruit_params
                params.require(:fruit).permit(:id, :name, :weight)
              end
        end
    end
end