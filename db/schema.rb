# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_04_16_120143) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "counts", force: :cascade do |t|
    t.string "name", default: "", null: false
    t.text "description"
    t.float "initial_amount", default: 0.0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "expensive_items", force: :cascade do |t|
    t.string "description", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "count_id", null: false
    t.string "color", null: false
    t.index ["count_id", "color"], name: "index_expensive_items_on_count_id_and_color", unique: true
    t.index ["count_id", "description"], name: "index_expensive_items_on_count_id_and_description", unique: true
    t.index ["count_id"], name: "index_expensive_items_on_count_id"
  end

  create_table "movements", force: :cascade do |t|
    t.bigint "expensive_item_id", null: false
    t.float "amount", null: false
    t.text "causal", null: false
    t.string "movement_type", null: false
    t.datetime "currency_date", precision: nil, null: false
    t.text "note"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "count_id", null: false
    t.integer "year", null: false
    t.integer "month", null: false
    t.integer "year_month", null: false
    t.index ["count_id"], name: "index_movements_on_count_id"
    t.index ["expensive_item_id"], name: "index_movements_on_expensive_item_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "first_name"
    t.string "last_name"
    t.boolean "admin"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "expensive_items", "counts"
  add_foreign_key "movements", "counts"
  add_foreign_key "movements", "expensive_items"
end
