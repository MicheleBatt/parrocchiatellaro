require "application_system_test_case"

class ExpensiveItemsTest < ApplicationSystemTestCase
  setup do
    @expensive_item = expensive_items(:one)
  end

  test "visiting the index" do
    visit expensive_items_url
    assert_selector "h1", text: "Expensive items"
  end

  test "should create expensive item" do
    visit expensive_items_url
    click_on "New expensive item"

    fill_in "Description", with: @expensive_item.description
    click_on "Create Expensive item"

    assert_text "Expensive item was successfully created"
    click_on "Back"
  end

  test "should update Expensive item" do
    visit expensive_item_url(@expensive_item)
    click_on "Edit this expensive item", match: :first

    fill_in "Description", with: @expensive_item.description
    click_on "Update Expensive item"

    assert_text "Expensive item was successfully updated"
    click_on "Back"
  end

  test "should destroy Expensive item" do
    visit expensive_item_url(@expensive_item)
    click_on "Destroy this expensive item", match: :first

    assert_text "Expensive item was successfully destroyed"
  end
end
