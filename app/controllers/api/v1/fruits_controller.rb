module Api
    module V1
        class FruitsController < ApplicationController

            def index
                @fruits = Fruit.order(id: :asc)
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

            def update
                @fruit = Fruit.where(id: fruit_params[:id])
                if @fruit.update(fruit_params)
                    render json: @fruit
                else
                    render json: {errors: @fruit.errors}
                end
            end

            def destroy
                Fruit.destroy(params[:id])
            end

            private
              def fruit_params
                params.require(:fruit).permit(:id, :name, :weight)
              end
        end
    end
end